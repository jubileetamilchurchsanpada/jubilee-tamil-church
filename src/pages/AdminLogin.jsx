import React, { useEffect, useState } from "react";
import { ArrowLeft, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import churchImg from "../assets/church.jpg";
import churchLogo from "../assets/logo.png";
import { getStoredSession, isSupabaseConfigured, signInWithPassword } from "../lib/supabaseRest";
import "../styles/AdminPortal.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
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
      setMessage(error.message || "Login failed.");
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
        <p>Secure access to the JTC Reminder App and church administration tools.</p>

        <form onSubmit={handleSubmit} className="jtc-admin-login-form">
          <label>
            Email Address
            <div className="jtc-admin-input-wrap">
              <Mail size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
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
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </div>
          </label>

          <button type="submit" className="jtc-admin-login-submit" disabled={loading || !isSupabaseConfigured()}>
            <ShieldCheck size={18} /> {loading ? "Signing in…" : "Login"}
          </button>

          {!isSupabaseConfigured() && (
            <div className="jtc-admin-login-message error">
              Secure database configuration is not deployed yet. Add the Supabase URL and anon key to the GitHub Pages build environment.
            </div>
          )}

          {message && <div className="jtc-admin-login-message error">{message}</div>}
        </form>

        <p className="jtc-admin-security-note">
          <strong>Security:</strong> passwords are handled by Supabase Auth and are never stored in this website repository.
        </p>
      </section>
    </main>
  );
}
