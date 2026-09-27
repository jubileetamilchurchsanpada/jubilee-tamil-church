import React, { useEffect, useState } from "react";
import { ArrowLeft, LockKeyhole, Mail, ShieldCheck, UserPlus } from "lucide-react";
import churchImg from "../assets/church.jpg";
import churchLogo from "../assets/logo.png";
import {
  getStoredSession,
  isSupabaseConfigured,
  JTC_ADMIN_EMAIL,
  signInWithPassword,
  signUpAdmin,
} from "../lib/supabaseRest";
import "../styles/AdminPortal.css";

export default function AdminLogin() {
  const [email, setEmail] = useState(JTC_ADMIN_EMAIL);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState("login");

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
      if (mode === "setup") {
        if (password.length < 8) throw new Error("Use a password with at least 8 characters.");
        const result = await signUpAdmin(email, password);
        if (result.access_token) {
          window.location.replace("/admin/dashboard");
          return;
        }
        setMessageType("success");
        setMessage("Admin account created. Check the church email inbox for the Supabase confirmation email, confirm it, then return here and log in.");
        setMode("login");
        return;
      }

      await signInWithPassword(email.trim(), password);
      window.location.replace("/admin/dashboard");
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "Authentication failed.");
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
        <h1>{mode === "setup" ? "Admin Setup" : "Admin Login"}</h1>
        <p>
          {mode === "setup"
            ? "Create the secure JTC admin account using the authorized church email."
            : "Secure access to the JTC Reminder App and church administration tools."}
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
                placeholder={mode === "setup" ? "Create password (8+ characters)" : "Enter password"}
                autoComplete={mode === "setup" ? "new-password" : "current-password"}
                minLength={mode === "setup" ? 8 : undefined}
                required
              />
            </div>
          </label>

          <button type="submit" className="jtc-admin-login-submit" disabled={loading || !isSupabaseConfigured()}>
            {mode === "setup" ? <UserPlus size={18} /> : <ShieldCheck size={18} />}
            {loading ? "Please wait…" : mode === "setup" ? "Create Admin Account" : "Login"}
          </button>

          <button
            type="button"
            className="jtc-admin-login-mode"
            onClick={() => {
              setMessage("");
              setPassword("");
              setMode((current) => (current === "login" ? "setup" : "login"));
            }}
          >
            {mode === "login" ? "First time? Set up admin account" : "Already set up? Return to login"}
          </button>

          {!isSupabaseConfigured() && (
            <div className="jtc-admin-login-message error">Secure database configuration is not deployed yet.</div>
          )}

          {message && <div className={`jtc-admin-login-message ${messageType}`}>{message}</div>}
        </form>

        <p className="jtc-admin-security-note">
          <strong>Security:</strong> reminder data is protected by Supabase Row Level Security and restricted to the authorized church admin email.
        </p>
      </section>
    </main>
  );
}
