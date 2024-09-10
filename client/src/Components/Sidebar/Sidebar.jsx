import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { MdAddModerator } from "react-icons/md";
import { FaBriefcase, FaUserGraduate, FaCalendarAlt } from "react-icons/fa"; // Importing FaCalendarAlt for Events

import "./index.css";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(true);
  const { token, setToken } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://127.0.0.1:4000/api/v1/user/admin/logout", {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Logged out successfully.");
      localStorage.removeItem("token");
      setToken(null);
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const navigateTo = useNavigate();

  const gotoHomePage = () => {
    navigateTo("/");
    setCollapsed(!collapsed);
  };

  const gotoStudentsPage = () => {
    navigateTo("/dashboard/cv");
    setCollapsed(true);
  };

  const gotoMessagesPage = () => {
    navigateTo("/dashboard/chat");
    setCollapsed(true);
  };

  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setCollapsed(true);
  };

  const gotoJobPage = () => {
    navigateTo("/job");
    setCollapsed(true);
  };

  const gotoEventsPage = () => {
    navigateTo("/dashboard/community");
    setCollapsed(true);
  };

  return (
    <>
      <nav
        style={!token ? { display: "none" } : { display: "flex" }}
        className={`SideBar ${collapsed ? "collapsed" : ""}`}
      >
        <div className="links">
          <div className="link-item">
            {collapsed ? (
              <TbLayoutSidebarRightCollapse
                onClick={() => setCollapsed(!collapsed)}
                size={50}
              />
            ) : (
              <TbLayoutSidebarLeftCollapse
                onClick={() => setCollapsed(!collapsed)}
                size={50}
              />
            )}
          </div>

          <div className="link-item" onClick={gotoHomePage}>
            <TiHome size={50} />
            {!collapsed && <span>Home</span>}
          </div>
          <div className="link-item" onClick={gotoStudentsPage}>
            <FaUserGraduate size={50} />
            {!collapsed && <span>Students</span>}
          </div>
          <div className="link-item" onClick={gotoAddNewAdmin}>
            <MdAddModerator size={50} />
            {!collapsed && <span>Add Admin</span>}
          </div>
          <div className="link-item" onClick={gotoJobPage}>
            <MdAddModerator size={50} />
            {!collapsed && <span>Job Offer</span>}
          </div>

          <div className="link-item" onClick={gotoMessagesPage}>
            <AiFillMessage size={50} />
            {!collapsed && <span>Messages</span>}
          </div>
          <div className="link-item" onClick={gotoEventsPage}>
            <FaCalendarAlt size={50} />
            {!collapsed && <span>Events</span>}
          </div>
          <div className="link-item" onClick={handleLogout}>
            <RiLogoutBoxFill size={50} />
            {!collapsed && <span>Logout</span>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
