import React, { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarHeart,
  Clipboard,
  ExternalLink,
  LogOut,
  PartyPopper,
  ShieldCheck,
  Users,
} from "lucide-react";
import churchLogo from "../assets/logo.png";
import "../styles/AdminPortal.css";

export default function AdminDashboard() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("jtc_admin_session") !== "1") {
      window.location.replace("/admin");
    }
  }, []);

  const launchLink = useMemo(
    () => `${window.location.origin}/?launch=1`,
    []
  );

  const copyLaunchLink = async () => {
    try {
      await navigator.clipboard.writeText(launchLink);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      window.prompt("Copy this priest launch link:", launchLink);
    }
  };

  const logout = () => {
    sessionStorage.removeItem("jtc_admin_session");
    window.location.href = "/admin";
  };

  return (
    <main className="jtc-admin-dashboard">
      <header className="jtc-admin-topbar">
        <a href="/" className="jtc-admin-brand">
          <img src={churchLogo} alt="Jubilee Tamil Church" />
          <span>
            <strong>Jubilee Tamil Church</strong>
            <small>Administration Portal</small>
          </span>
        </a>

        <div className="jtc-admin-top-actions">
          <a href="/" className="jtc-admin-ghost-btn">
            <ArrowLeft size={17} /> Website
          </a>
          <button type="button" className="jtc-admin-ghost-btn" onClick={logout}>
            <LogOut size={17} /> Logout
          </button>
        </div>
      </header>

      <section className="jtc-admin-dashboard-hero">
        <div>
          <span className="jtc-admin-kicker"><ShieldCheck size={16} /> ADMIN ACCESS</span>
          <h1>Church Administration</h1>
          <p>
            Manage church reminders and use the ceremonial website launch screen from one place.
          </p>
        </div>
      </section>

      <section className="jtc-admin-tools-grid">
        <article className="jtc-admin-tool-card jtc-admin-tool-members">
          <div className="jtc-admin-tool-icon"><Users /></div>
          <span className="jtc-admin-card-label">MEMBERS & CELEBRATIONS</span>
          <h2>JTC Reminder App</h2>
          <p>
            Manage birthdays and wedding anniversaries and see celebrations coming up in the next 30 days.
          </p>
          <div className="jtc-admin-card-tags">
            <span><CalendarHeart size={14} /> Birthdays</span>
            <span><CalendarHeart size={14} /> Anniversaries</span>
          </div>
          <a href="/admin/reminders" className="jtc-admin-primary-btn">
            Open JTC Reminder App <ExternalLink size={17} />
          </a>
          <small className="jtc-admin-note">
            Member data is intentionally kept out of the public GitHub repository.
          </small>
        </article>

        <article className="jtc-admin-tool-card jtc-admin-tool-launch">
          <div className="jtc-admin-tool-icon"><PartyPopper /></div>
          <span className="jtc-admin-card-label">CEREMONIAL WEBSITE LAUNCH</span>
          <h2>Priest “Go Live” Button</h2>
          <p>
            Give this link to the priest. One tap opens the launch screen; pressing GO LIVE starts a 5-to-1 countdown followed by balloons and confetti.
          </p>

          <div className="jtc-launch-link-box">
            <span>{launchLink}</span>
            <button type="button" onClick={copyLaunchLink}>
              <Clipboard size={16} /> {copied ? "Copied" : "Copy"}
            </button>
          </div>

          <a
            href="/?launch=1"
            target="_blank"
            rel="noopener noreferrer"
            className="jtc-admin-primary-btn"
          >
            Preview Launch Screen <PartyPopper size={17} />
          </a>
        </article>
      </section>

      <section className="jtc-admin-info-strip">
        <ShieldCheck size={20} />
        <p>
          JTC Reminder App code can live in this public repository, but real member records should be stored only in a private authenticated database.
        </p>
      </section>
    </main>
  );
}
