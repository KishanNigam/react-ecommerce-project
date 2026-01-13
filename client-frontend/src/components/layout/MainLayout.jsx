import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "../../styles/layout.css";

function MainLayout() {
  return (
    <>
      <Header />

      {/* MAIN CONTENT WRAPPER */}
      <main className="client-main">
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;
