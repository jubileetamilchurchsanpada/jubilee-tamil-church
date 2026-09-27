import React from "react";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import LaunchPage from "./pages/LaunchPage";
import UlweBranch from "./components/UlweBranch";
import LatestSermonEnhancer from "./components/LatestSermonEnhancer";

export default function App() {
  const path = window.location.pathname.toLowerCase();
  const params = new URLSearchParams(window.location.search);
  const adminMode = params.get("admin");
  const launchMode = params.get("launch");

  if (launchMode === "1" || path === "/launch" || path === "/launch/") {
    return <LaunchPage />;
  }

  if (
    adminMode === "dashboard" ||
    path === "/admin/dashboard" ||
    path === "/admin/dashboard/"
  ) {
    return <AdminDashboard />;
  }

  if (
    adminMode === "1" ||
    adminMode === "login" ||
    path === "/admin" ||
    path === "/admin/"
  ) {
    return <AdminLogin />;
  }

  return (
    <>
      <Home />
      <LatestSermonEnhancer />
      <UlweBranch />
    </>
  );
}
