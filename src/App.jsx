import React from "react";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import UlweBranch from "./components/UlweBranch";

export default function App() {
  const path = window.location.pathname.toLowerCase();

  if (path === "/admin" || path === "/admin/") {
    return <AdminLogin />;
  }

  return (
    <>
      <Home />
      <UlweBranch />
    </>
  );
}
