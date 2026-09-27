import React from "react";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import JtcReminderApp from "./pages/JtcReminderApp";
import UlweBranch from "./components/UlweBranch";
import LatestSermonEnhancer from "./components/LatestSermonEnhancer";
import ChurchInfoCorrections from "./components/ChurchInfoCorrections";

export default function App() {
  const params = new URLSearchParams(window.location.search);
  const redirectedPath = params.get("jtc_path");

  if (redirectedPath) {
    window.history.replaceState({}, "", redirectedPath);
  }

  const path = window.location.pathname.toLowerCase().replace(/\/$/, "") || "/";

  if (path === "/admin") return <AdminLogin />;
  if (path === "/admin/dashboard") return <AdminDashboard />;
  if (path === "/admin/reminders") return <JtcReminderApp />;

  return (
    <>
      <Home />
      <LatestSermonEnhancer />
      <UlweBranch />
      <ChurchInfoCorrections />
    </>
  );
}