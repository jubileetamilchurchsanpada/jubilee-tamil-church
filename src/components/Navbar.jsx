import React, { useEffect, useState } from "react";
import { Menu, X, Cross, LockKeyhole } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import churchLogo from "../assets/logo.png";

const links = [
  ["Home", "home"],
  ["About", "about"],
  ["Services", "services"],
  ["Sermons", "sermons"],
  ["Events", "events"],
  ["Gallery", "gallery"],
  ["Leadership", "leadership"],
  ["Contact", "contact"],
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header className={`nav-shell ${solid ? "nav-solid" : ""}`}>
      <div className="container navbar">
        <button
  className="brand"
  onClick={() => go("home")}
  aria-label="Jubilee Tamil Church home"
>
  <span className="brand-mark brand-logo">
    <img
      src={churchLogo}
      alt="Jubilee Tamil Church logo"
    />
  </span>

  <span>
    <strong>JUBILEE</strong>
    <small>TAMIL CHURCH</small>
  </span>
</button>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map(([label, id]) => (
            <button key={id} onClick={() => go(id)}>
              {label}
            </button>
          ))}

          <a href="/admin" className="admin-nav-link">
            <LockKeyhole size={14} />
            Admin
          </a>
        </nav>

        <button
          className="nav-menu"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
          >
            {links.map(([label, id]) => (
              <button key={id} onClick={() => go(id)}>
                {label}
              </button>
            ))}

            <a href="/admin" className="mobile-admin-link">
              <LockKeyhole size={15} />
              Admin Login
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
