import React, { useState } from "react";
import { ArrowLeft, LockKeyhole, ShieldCheck, User } from "lucide-react";
import churchImg from "../assets/church.jpg";
import churchLogo from "../assets/logo.png";
import "../styles/AdminPortal.css";

const ADMIN_ID = "admin";
const PASSWORD_SHA256 = "73ee6dfae2563cd2f4b8dad8b3d4f58f2e7509f6ae1aeee49c48897dffd51124";

async function sha256(value) {
  const data = new TextEncoder().encode(value);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export default function AdminLogin() {
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");

    const form = new FormData(event.currentTarget);
    const loginId = String(form.get("loginId") || "").trim().toLowerCase();
    const password = String(form.get("password") || "");

    try {
      const passwordHash = await sha256(password);
      const valid = loginId === ADMIN_ID && passwordHash === PASSWORD_SHA256;

      if (!valid) {
        setMessage("Login ID or password is incorrect.");
        setBusy(false);
        return;
      }

      sessionStorage.setItem("jtc_admin_session", "1");
      setMessage("Login successful. Opening dashboard…");
      window.setTimeout(() => {
        window.location.href = "/?admin=dashboard";
      }, 450);
    } catch {
      setMessage("Unable to verify login on this browser. Please try again.");
      setBusy(false);
    }
  };

  return (
    <main className="jtc-admin-login-screen">
      <img src={churchImg} alt="" className="jtc-admin-login-bg" />
      <div className="jtc-admin-login-overlay" />

      <a href="/" className="jtc-admin-login-back">
        <ArrowLeft size={18} /> Back to Church Website
      </a>

      <section className="jtc-admin-login-panel">
        <img src={churchLogo} alt="Jubilee Tamil Church" className="jtc-admin-login-logo" />
        <span className="jtc-admin-login-label">JUBILEE TAMIL CHURCH</span>
        <h1>Admin Login</h1>
        <p>Authorized church administration access.</p>

        <form onSubmit={handleSubmit} className="jtc-admin-login-form">
          <label>
            Login ID
            <div className="jtc-admin-input-wrap">
              <User size={18} />
              <input
                type="text"
                name="loginId"
                placeholder="Enter login ID"
                autoComplete="username"
                required
              />
            </div>
          </label>

          <label>
            Password
            <div className="jtc-admin-input-wrap">
              <LockKeyhole size={18} />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </div>
          </label>

          <button type="submit" className="jtc-admin-login-submit" disabled={busy}>
            <ShieldCheck size={18} />
            {busy ? "Checking…" : "Login"}
          </button>

          {message && (
            <div className={`jtc-admin-login-message ${message.startsWith("Login successful") ? "success" : "error"}`}>
              {message}
            </div>
          )}
        </form>

        <p className="jtc-admin-security-note">
          <strong>Note:</strong> this is a client-side gate on a static GitHub Pages site. It keeps the password out of plain text, but it is not equivalent to server-side authentication.
        </p>
      </section>
    </main>
  );
}
