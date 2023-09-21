import React from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Footer from "../footer/Footer.jsx";
import { Outlet } from "react-router-dom";
import "./Layout.css";
//Imports ----------------

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="min-height-80">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
