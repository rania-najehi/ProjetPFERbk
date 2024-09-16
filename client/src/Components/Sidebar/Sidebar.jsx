import React, { useContext, useState } from "react";
import { Context } from "../../main";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
import { TbLayoutSidebarRightCollapse } from "react-icons/tb";
import { AiOutlineUsergroupAdd } from "react-icons/ai";

import { AiFillWechat } from "react-icons/ai";

import { AiOutlineFilePdf } from "react-icons/ai";
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
    navigateTo("/dashboard");
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
    navigateTo("/dashboard/community");
    setCollapsed(true);
  };

  const gotoJobPage = () => {
    navigateTo("/job");
    setCollapsed(true);
  };

  const gotoEventsPage = () => {
    navigateTo("/dashboard/event");
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
                size={30}
              />
            ) : (
              <TbLayoutSidebarLeftCollapse
                onClick={() => setCollapsed(!collapsed)}
                size={30}
              />
            )}
          </div>

          <div className="link-item" onClick={gotoHomePage}>
            <TiHome size={30} />
            {!collapsed && <span>Home</span>}
          </div>
          <div className="link-item" onClick={gotoStudentsPage}>
            <AiOutlineFilePdf size={30} />
            {!collapsed && <span>Resume</span>}
          </div>
          <div className="link-item" onClick={gotoAddNewAdmin}>
            <AiOutlineUsergroupAdd size={30} />
            {!collapsed && <span>Connect</span>}
          </div>
          <div className="link-item" onClick={gotoJobPage}>
            <MdAddModerator size={30} />
            {!collapsed && <span>Job Offer</span>}
          </div>

          <div className="link-item" onClick={gotoMessagesPage}>
            <AiFillWechat size={30} />
            {!collapsed && <span>Messages</span>}
          </div>
          <div className="link-item" onClick={gotoEventsPage}>
            <FaCalendarAlt size={30} />
            {!collapsed && <span>Events</span>}
          </div>
          <div className="link-item" onClick={handleLogout}>
            <RiLogoutBoxFill size={30} />
            {!collapsed && <span>Logout</span>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default SideBar;
