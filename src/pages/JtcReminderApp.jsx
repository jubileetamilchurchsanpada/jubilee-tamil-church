import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarHeart,
  Cake,
  FileUp,
  HeartHandshake,
  LogOut,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import churchLogo from "../assets/logo.png";
import {
  addReminder,
  deleteReminder,
  getReminders,
  getStoredSession,
  importReminders,
  signOut,
} from "../lib/supabaseRest";
import "../styles/JtcReminderApp.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function startOfToday() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function daysUntil(dateValue) {
  if (!dateValue) return 999;
  const today = startOfToday();
  const source = new Date(`${dateValue}T00:00:00`);
  let next = new Date(today.getFullYear(), source.getMonth(), source.getDate());
  if (next < today) next = new Date(today.getFullYear() + 1, source.getMonth(), source.getDate());
  return Math.round((next - today) / 86400000);
}

function getSundayToSaturdayWindow() {
  const today = startOfToday();
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - today.getDay());
  const saturday = new Date(sunday);
  saturday.setDate(sunday.getDate() + 6);
  return { today, sunday, saturday };
}

function occurrenceInWindow(dateValue, start, end) {
  if (!dateValue) return null;
  const source = new Date(`${dateValue}T00:00:00`);
  const years = start.getFullYear() === end.getFullYear()
    ? [start.getFullYear()]
    : [start.getFullYear(), end.getFullYear()];

  for (const year of years) {
    const occurrence = new Date(year, source.getMonth(), source.getDate());
    if (occurrence >= start && occurrence <= end) return occurrence;
  }
  return null;
}

function monthIndexFromSearch(value) {
  const q = value.trim().toLowerCase();
  if (q.length < 3) return -1;
  return MONTHS.findIndex((month) => month.toLowerCase().startsWith(q));
}

function formatDate(dateValue) {
  if (!dateValue) return "—";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" }).format(
    new Date(`${dateValue}T00:00:00`)
  );
}

function formatOccurrence(dateValue) {
  return new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "2-digit", month: "short" }).format(dateValue);
}

function formatWeekRange(start, end) {
  const startText = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" }).format(start);
  const endText = new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" }).format(end);
  return `${startText} – ${endText}`;
}

function relativeDayLabel(days) {
  if (days === 0) return "Today";
  if (days > 0) return `In ${days} day${days === 1 ? "" : "s"}`;
  const elapsed = Math.abs(days);
  return `${elapsed} day${elapsed === 1 ? "" : "s"} ago`;
}

function parseCsvLine(line) {
  const cells = [];
  let current = "";
  let quoted = false;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === '"') {
      if (quoted && line[i + 1] === '"') {
        current += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      cells.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current);
  return cells;
}

function parseReminderCsv(text) {
  const normalized = text.replace(/^\uFEFF/, "").replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n").filter((line) => line.trim());
  if (lines.length < 2) return [];
  const headers = parseCsvLine(lines[0]).map((x) => x.trim().toLowerCase());
  const typeIndex = headers.indexOf("type");
  const nameIndex = headers.indexOf("name");
  const dateIndex = headers.indexOf("date");
  if (typeIndex < 0 || nameIndex < 0 || dateIndex < 0) {
    throw new Error("CSV must contain type, name and date columns.");
  }
  return lines.slice(1).map(parseCsvLine).map((cells) => ({
    type: (cells[typeIndex] || "").trim().toLowerCase(),
    name: (cells[nameIndex] || "").trim(),
    date: (cells[dateIndex] || "").trim(),
  })).filter((item) => ["birthday", "anniversary"].includes(item.type) && item.name && /^\d{4}-\d{2}-\d{2}$/.test(item.date));
}

export default function JtcReminderApp() {
  const [records, setRecords] = useState([]);
  const [query, setQuery] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [type, setType] = useState("birthday");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [importing, setImporting] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getReminders();
      setRecords(data);
    } catch (error) {
      if (error.message === "AUTH_REQUIRED") {
        window.location.replace("/admin");
        return;
      }
      setMessage(error.message || "Unable to load reminders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getStoredSession()?.access_token) {
      window.location.replace("/admin");
      return;
    }
    load();
  }, []);

  const weekWindow = useMemo(() => getSundayToSaturdayWindow(), []);

  const nextSevenDays = useMemo(() => records
    .map((item) => {
      const occurrence = occurrenceInWindow(item.date, weekWindow.sunday, weekWindow.saturday);
      if (!occurrence) return null;
      return {
        ...item,
        occurrence,
        days: Math.round((occurrence - weekWindow.today) / 86400000),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.occurrence - b.occurrence || a.name.localeCompare(b.name)),
  [records, weekWindow]);

  const upcoming = useMemo(
    () => records
      .map((item) => ({ ...item, days: daysUntil(item.date) }))
      .filter((item) => item.days <= 30)
      .sort((a, b) => a.days - b.days || a.name.localeCompare(b.name)),
    [records]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const searchedMonth = monthIndexFromSearch(q);
    const selectedMonth = monthFilter === "" ? -1 : Number(monthFilter);
    const activeMonth = selectedMonth >= 0 ? selectedMonth : searchedMonth;
    const nameQuery = selectedMonth < 0 && searchedMonth >= 0 ? "" : q;

    return records
      .map((item) => ({ ...item, days: daysUntil(item.date) }))
      .filter((item) => {
        const itemMonth = item.date ? Number(item.date.slice(5, 7)) - 1 : -1;
        const matchesMonth = activeMonth < 0 || itemMonth === activeMonth;
        const matchesName = !nameQuery || item.name.toLowerCase().includes(nameQuery);
        return matchesMonth && matchesName;
      })
      .sort((a, b) => {
        if (activeMonth >= 0) {
          const dayDifference = Number(a.date.slice(8, 10)) - Number(b.date.slice(8, 10));
          if (dayDifference !== 0) return dayDifference;
        }
        return a.days - b.days || a.name.localeCompare(b.name);
      });
  }, [records, query, monthFilter]);

  const addRecord = async (event) => {
    event.preventDefault();
    if (!name.trim() || !date) return;
    try {
      setMessage("");
      const saved = await addReminder({ type, name: name.trim(), date });
      if (saved) setRecords((current) => [...current, saved]);
      else await load();
      setName("");
      setDate("");
      setMessage("Reminder added securely.");
    } catch (error) {
      setMessage(error.message || "Unable to add reminder.");
    }
  };

  const removeRecord = async (id) => {
    if (!window.confirm("Delete this reminder?")) return;
    try {
      await deleteReminder(id);
      setRecords((current) => current.filter((item) => item.id !== id));
      setMessage("Reminder deleted.");
    } catch (error) {
      setMessage(error.message || "Unable to delete reminder.");
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      setImporting(true);
      setMessage("");
      const rows = parseReminderCsv(await file.text());
      if (!rows.length) throw new Error("No valid reminder rows found in the CSV.");
      await importReminders(rows);
      await load();
      setMessage(`${rows.length} reminder rows imported securely.`);
    } catch (error) {
      setMessage(error.message || "Import failed.");
    } finally {
      setImporting(false);
    }
  };

  const logout = async () => {
    await signOut();
    window.location.href = "/admin";
  };

  return (
    <main className="jtc-reminder-page">
      <header className="jtc-reminder-topbar">
        <a href="/admin/dashboard" className="jtc-reminder-brand">
          <img src={churchLogo} alt="Jubilee Tamil Church" />
          <span><strong>JTC Reminder App</strong><small>Birthday & Wedding Anniversary</small></span>
        </a>
        <div className="jtc-reminder-actions">
          <a href="/admin/dashboard" className="jtc-reminder-ghost"><ArrowLeft size={17} /> Dashboard</a>
          <button onClick={logout} className="jtc-reminder-ghost"><LogOut size={17} /> Logout</button>
        </div>
      </header>

      <section className="jtc-reminder-hero">
        <span><ShieldCheck size={16} /> PRIVATE DATABASE</span>
        <h1>JTC Reminder App</h1>
        <p>Securely manage church member birthdays and wedding anniversaries, with a Sunday-to-Saturday weekly view and the next 30 days.</p>
      </section>

      <section className="jtc-reminder-layout">
        <div className="jtc-reminder-main">
          <div className="jtc-reminder-stats">
            <article><Cake /><div><strong>{records.filter((r) => r.type === "birthday").length}</strong><span>Birthdays</span></div></article>
            <article><HeartHandshake /><div><strong>{records.filter((r) => r.type === "anniversary").length}</strong><span>Anniversaries</span></div></article>
            <article><CalendarHeart /><div><strong>{nextSevenDays.length}</strong><span>Next 7 Days</span></div></article>
            <article><CalendarHeart /><div><strong>{upcoming.length}</strong><span>Next 30 Days</span></div></article>
          </div>

          {message && <div className="jtc-reminder-status">{message}</div>}

          <div className="jtc-reminder-upcoming-grid">
            <div className="jtc-reminder-card jtc-reminder-upcoming-card">
              <div className="jtc-reminder-card-head">
                <div>
                  <span className="jtc-reminder-kicker">SUNDAY TO SATURDAY</span>
                  <h2>Next 7 Days</h2>
                  <small className="jtc-reminder-range">{formatWeekRange(weekWindow.sunday, weekWindow.saturday)}</small>
                </div>
              </div>
              {loading ? <p className="jtc-reminder-empty">Loading reminders…</p> : nextSevenDays.length === 0 ? (
                <p className="jtc-reminder-empty">No celebrations from Sunday through Saturday.</p>
              ) : (
                <div className="jtc-reminder-list">
                  {nextSevenDays.map((item) => (
                    <div className="jtc-reminder-row" key={`week-${item.id}`}>
                      <div className={`jtc-reminder-icon ${item.type}`}>{item.type === "birthday" ? <Cake /> : <HeartHandshake />}</div>
                      <div className="jtc-reminder-person"><strong>{item.name}</strong><span>{item.type === "birthday" ? "Birthday" : "Wedding Anniversary"}</span></div>
                      <div className="jtc-reminder-date"><strong>{formatOccurrence(item.occurrence)}</strong><span>{relativeDayLabel(item.days)}</span></div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="jtc-reminder-card jtc-reminder-upcoming-card">
              <div className="jtc-reminder-card-head">
                <div><span className="jtc-reminder-kicker">UPCOMING</span><h2>Next 30 Days</h2><small className="jtc-reminder-range">From today forward</small></div>
              </div>
              {loading ? <p className="jtc-reminder-empty">Loading reminders…</p> : upcoming.length === 0 ? (
                <p className="jtc-reminder-empty">No celebrations in the next 30 days.</p>
              ) : (
                <div className="jtc-reminder-list">
                  {upcoming.map((item) => (
                    <div className="jtc-reminder-row" key={`month-${item.id}`}>
                      <div className={`jtc-reminder-icon ${item.type}`}>{item.type === "birthday" ? <Cake /> : <HeartHandshake />}</div>
                      <div className="jtc-reminder-person"><strong>{item.name}</strong><span>{item.type === "birthday" ? "Birthday" : "Wedding Anniversary"}</span></div>
                      <div className="jtc-reminder-date"><strong>{formatDate(item.date)}</strong><span>{item.days === 0 ? "Today" : `In ${item.days} day${item.days === 1 ? "" : "s"}`}</span></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="jtc-reminder-card">
            <div className="jtc-reminder-card-head jtc-reminder-search-head">
              <div><span className="jtc-reminder-kicker">MEMBERS</span><h2>All Reminders</h2></div>
              <div className="jtc-reminder-filter-controls">
                <label className="jtc-reminder-search"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name or month" /></label>
                <select className="jtc-reminder-month-select" value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} aria-label="Filter reminders by month">
                  <option value="">All Months</option>
                  {MONTHS.map((month, index) => <option key={month} value={index}>{month}</option>)}
                </select>
              </div>
            </div>
            {!loading && filtered.length === 0 ? <p className="jtc-reminder-empty">No records found for this search or month.</p> : (
              <div className="jtc-reminder-list">
                {filtered.map((item) => (
                  <div className="jtc-reminder-row" key={item.id}>
                    <div className={`jtc-reminder-icon ${item.type}`}>{item.type === "birthday" ? <Cake /> : <HeartHandshake />}</div>
                    <div className="jtc-reminder-person"><strong>{item.name}</strong><span>{item.type === "birthday" ? "Birthday" : "Wedding Anniversary"}</span></div>
                    <div className="jtc-reminder-date"><strong>{formatDate(item.date)}</strong><span>{item.days === 0 ? "Today" : `In ${item.days} days`}</span></div>
                    <button className="jtc-reminder-delete" onClick={() => removeRecord(item.id)} aria-label={`Delete ${item.name}`}><Trash2 size={17} /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <aside className="jtc-reminder-side">
          <form className="jtc-reminder-card jtc-reminder-form" onSubmit={addRecord}>
            <span className="jtc-reminder-kicker">ADD REMINDER</span>
            <h2>New Celebration</h2>
            <label>Type<select value={type} onChange={(e) => setType(e.target.value)}><option value="birthday">Birthday</option><option value="anniversary">Wedding Anniversary</option></select></label>
            <label>Name<input value={name} onChange={(e) => setName(e.target.value)} placeholder={type === "birthday" ? "Member name" : "Couple / family name"} required /></label>
            <label>Date<input type="date" value={date} onChange={(e) => setDate(e.target.value)} required /></label>
            <button type="submit" className="jtc-reminder-primary"><Plus size={17} /> Add Reminder</button>
          </form>

          <div className="jtc-reminder-card jtc-reminder-import">
            <span className="jtc-reminder-kicker">EXCEL DATA IMPORT</span>
            <h2>Import Church List</h2>
            <p>Upload the private JTC reminder CSV prepared from the church workbook. The data goes directly to the authenticated database and is not committed to GitHub.</p>
            <label className="jtc-reminder-primary jtc-reminder-file-button">
              <FileUp size={17} /> {importing ? "Importing…" : "Choose Reminder CSV"}
              <input type="file" accept=".csv,text/csv" onChange={handleImport} disabled={importing} />
            </label>
          </div>

          <div className="jtc-reminder-privacy">
            <ShieldCheck size={20} />
            <div><strong>Private member records</strong><p>Records are stored in Supabase behind authenticated access and database security policies. The public GitHub repository contains application code only.</p></div>
          </div>
        </aside>
      </section>
    </main>
  );
}