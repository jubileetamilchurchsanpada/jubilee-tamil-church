import React, { useEffect, useState } from "react";
import { ArrowLeft, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import churchImg from "../assets/church.jpg";
import churchLogo from "../assets/logo.png";
import {
  getStoredSession,
  isSupabaseConfigured,
  JTC_ADMIN_EMAIL,
  signInWithPassword,
} from "../lib/supabaseRest";
import "../styles/AdminPortal.css";

export default function AdminLogin() {
  const [email, setEmail] = useState(JTC_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getStoredSession()?.access_token) {
      window.location.replace("/admin/dashboard");
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      await signInWithPassword(email.trim(), password);
      window.location.replace("/admin/dashboard");
    } catch (error) {
      setMessage(error.message || "Incorrect email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="jtc-admin-login-screen">
      <img src={churchImg} alt="" className="jtc-admin-login-bg" />
      <div className="jtc-admin-login-overlay" />

      <a href="/" className="jtc-admin-login-back">
        <ArrowLeft size={17} /> Back to Church Website
      </a>

      <section className="jtc-admin-login-panel">
        <img src={churchLogo} alt="Jubilee Tamil Church" className="jtc-admin-login-logo" />
        <span className="jtc-admin-login-label">JUBILEE TAMIL CHURCH</span>
        <h1>Admin Login</h1>
        <p>
          This admin page is publicly accessible, but the dashboard is available only to authorized users with the correct password.
        </p>

        <form onSubmit={handleSubmit} className="jtc-admin-login-form">
          <label>
            Email Address
            <div className="jtc-admin-input-wrap">
              <Mail size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                autoComplete="current-password"
                required
              />
            </div>
          </label>

          <button type="submit" className="jtc-admin-login-submit" disabled={loading || !isSupabaseConfigured()}>
            <ShieldCheck size={18} />
            {loading ? "Please wait…" : "Login"}
          </button>

          {!isSupabaseConfigured() && (
            <div className="jtc-admin-login-message error">Secure database configuration is not deployed yet.</div>
          )}

          {message && <div className="jtc-admin-login-message error">{message}</div>}
        </form>

        <p className="jtc-admin-security-note">
          Don&apos;t have the admin password? Use the <strong>Back to Church Website</strong> button above.
        </p>
      </section>
    </main>
  );
}
