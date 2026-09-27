import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarHeart,
  Cake,
  HeartHandshake,
  LogOut,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import churchLogo from "../assets/logo.png";
import "../styles/JtcReminderApp.css";

const STORAGE_KEY = "jtc_reminder_records_v1";

function loadRecords() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function daysUntil(dateValue) {
  if (!dateValue) return 999;
  const now = new Date();
  const source = new Date(`${dateValue}T00:00:00`);
  let next = new Date(now.getFullYear(), source.getMonth(), source.getDate());
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (next < today) next = new Date(now.getFullYear() + 1, source.getMonth(), source.getDate());
  return Math.round((next - today) / 86400000);
}

function formatDate(dateValue) {
  if (!dateValue) return "—";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short" }).format(
    new Date(`${dateValue}T00:00:00`)
  );
}

export default function JtcReminderApp() {
  const [records, setRecords] = useState(loadRecords);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("birthday");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("jtc_admin_session") !== "1") {
      window.location.replace("/admin");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const upcoming = useMemo(
    () => records
      .map((item) => ({ ...item, days: daysUntil(item.date) }))
      .filter((item) => item.days <= 30)
      .sort((a, b) => a.days - b.days),
    [records]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return records
      .map((item) => ({ ...item, days: daysUntil(item.date) }))
      .filter((item) => !q || item.name.toLowerCase().includes(q))
      .sort((a, b) => a.days - b.days);
  }, [records, query]);

  const addRecord = (event) => {
    event.preventDefault();
    if (!name.trim() || !date) return;
    setRecords((current) => [
      ...current,
      { id: crypto.randomUUID(), type, name: name.trim(), date },
    ]);
    setName("");
    setDate("");
  };

  const removeRecord = (id) => {
    setRecords((current) => current.filter((item) => item.id !== id));
  };

  const logout = () => {
    sessionStorage.removeItem("jtc_admin_session");
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
        <span><ShieldCheck size={16} /> ADMIN ONLY</span>
        <h1>JTC Reminder App</h1>
        <p>Track church member birthdays and wedding anniversaries and quickly see celebrations coming up in the next 30 days.</p>
      </section>

      <section className="jtc-reminder-layout">
        <div className="jtc-reminder-main">
          <div className="jtc-reminder-stats">
            <article><Cake /><div><strong>{records.filter((r) => r.type === "birthday").length}</strong><span>Birthdays</span></div></article>
            <article><HeartHandshake /><div><strong>{records.filter((r) => r.type === "anniversary").length}</strong><span>Anniversaries</span></div></article>
            <article><CalendarHeart /><div><strong>{upcoming.length}</strong><span>Next 30 Days</span></div></article>
          </div>

          <div className="jtc-reminder-card">
            <div className="jtc-reminder-card-head">
              <div><span className="jtc-reminder-kicker">UPCOMING</span><h2>Next 30 Days</h2></div>
            </div>
            {upcoming.length === 0 ? (
              <p className="jtc-reminder-empty">No upcoming reminders yet. Add records using the form.</p>
            ) : (
              <div className="jtc-reminder-list">
                {upcoming.map((item) => (
                  <div className="jtc-reminder-row" key={item.id}>
                    <div className={`jtc-reminder-icon ${item.type}`}>{item.type === "birthday" ? <Cake /> : <HeartHandshake />}</div>
                    <div className="jtc-reminder-person"><strong>{item.name}</strong><span>{item.type === "birthday" ? "Birthday" : "Wedding Anniversary"}</span></div>
                    <div className="jtc-reminder-date"><strong>{formatDate(item.date)}</strong><span>{item.days === 0 ? "Today" : `${item.days} day${item.days === 1 ? "" : "s"}`}</span></div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="jtc-reminder-card">
            <div className="jtc-reminder-card-head jtc-reminder-search-head">
              <div><span className="jtc-reminder-kicker">MEMBERS</span><h2>All Reminders</h2></div>
              <label className="jtc-reminder-search"><Search size={17} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search name" /></label>
            </div>
            {filtered.length === 0 ? (
              <p className="jtc-reminder-empty">No records found.</p>
            ) : (
              <div className="jtc-reminder-list">
                {filtered.map((item) => (
                  <div className="jtc-reminder-row" key={item.id}>
                    <div className={`jtc-reminder-icon ${item.type}`}>{item.type === "birthday" ? <Cake /> : <HeartHandshake />}</div>
                    <div className="jtc-reminder-person"><strong>{item.name}</strong><span>{item.type === "birthday" ? "Birthday" : "Wedding Anniversary"}</span></div>
                    <div className="jtc-reminder-date"><strong>{formatDate(item.date)}</strong><span>In {item.days} days</span></div>
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

          <div className="jtc-reminder-privacy">
            <ShieldCheck size={20} />
            <div><strong>Private-by-design first version</strong><p>Real member data is not committed to the public GitHub repository. Records entered here stay in this browser only. For church-wide use, connect this screen to a private authenticated database.</p></div>
          </div>
        </aside>
      </section>
    </main>
  );
}
