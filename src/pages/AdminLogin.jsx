import React, { useState } from "react";
import { ArrowLeft, Cross, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import churchImg from "../assets/church.jpg";
import churchLogo from "../assets/logo.png";

export default function AdminLogin() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("Admin dashboard features are coming soon.");
  };

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <img
          src={churchImg}
          alt="Jubilee Tamil Church"
          className="admin-bg"
        />

        <div className="admin-overlay" />

        <a href="/" className="admin-back">
          <ArrowLeft size={18} />
          Back to Church Website
        </a>

        <motion.div
          className="admin-login-card"
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <div className="admin-logo admin-church-logo">
  <img
    src={churchLogo}
    alt="Jubilee Tamil Church logo"
  />
</div>
          <span className="admin-eyebrow">JUBILEE TAMIL CHURCH</span>

          <h1>Admin Login</h1>

          <p className="admin-intro">
            Secure access for authorized church administration.
          </p>

          <form onSubmit={handleSubmit} className="admin-form">
            <label>
              Email Address
              <div className="admin-input-wrap">
                <Mail size={18} />
                <input
                  type="email"
                  name="email"
                  placeholder="admin@example.com"
                  required
                />
              </div>
            </label>

            <label>
              Password
              <div className="admin-input-wrap">
                <LockKeyhole size={18} />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  required
                />
              </div>
            </label>

            <button type="submit" className="admin-login-btn">
              <ShieldCheck size={18} />
              Login
            </button>

            {message && (
              <div className="admin-message">
                {message}
              </div>
            )}
          </form>
        </motion.div>
      </section>

      <section className="admin-coming-soon">
        <div className="container admin-coming-grid">
          <motion.div
            className="admin-coming-image"
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img src={churchImg} alt="Jubilee Tamil Church building" />
            <div className="admin-image-frame" />
          </motion.div>

          <motion.div
            className="admin-coming-copy"
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="admin-eyebrow">ADMIN PORTAL</span>

            <h2>
              Something Special Is
              <br />
              <span>Coming Soon.</span>
            </h2>

            <p>
              The Jubilee Tamil Church administration portal is currently
              being prepared. Future tools can include church announcements,
              events, sermons, gallery management and other administrative
              features.
            </p>

            <div className="admin-coming-line" />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
