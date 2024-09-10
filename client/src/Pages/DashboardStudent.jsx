import React from "react";
import Sidebar from "../Components/sideBar/sidebar.jsx";
import NavbarStudent from "../Components/NavbarStudent/NavbarStudent.jsx";
import { Outlet } from "react-router-dom";
import "../Components/sideBar/index.css";
const DashboardStudent = () => {
  return (
    <div className="dashboard_container">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default DashboardStudent;
