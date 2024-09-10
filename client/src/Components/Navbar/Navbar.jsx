import React, { useState, useContext } from "react";
import "./Navbar.css";

import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Context } from "../../main";
import axios from "axios";

import logo from "../../images/rbk logo.png";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { token, setToken } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigateTo = useNavigate();
  console.log("anchorEl", anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    handleClose();

    setToken(null);
    navigateTo("/login");
  };

  const goToLogin = () => {
    navigateTo("/login");
  };
  const MoveToDashboard = () => {
    navigateTo("/dashboard");
    handleClose();
  };
  return (
    <nav
      className="navbar"
      style={
        {
          // background: "#ff007b",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "space-between",
        }
      }
    >
      <div className="logo">
        <img
          src={logo}
          alt="logo"
          className="logo-img"
          style={{ width: "150px" }}
        />
      </div>

      <div
        className={show ? "navLinks showmenu" : "navLinks"}
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link className="navLink" to={"/"} onClick={() => setShow(!show)}>
          Accueil
        </Link>
        <Link
          className="navLink"
          to={"/appointment"}
          onClick={() => setShow(!show)}
        >
          Rendez-vous
        </Link>
        <Link className="navLink" to={"/about"} onClick={() => setShow(!show)}>
          Programme
        </Link>
      </div>
      <div className="hamburger" onClick={() => setShow(!show)}>
        {token ? (
          <div>
            <IconButton
              onClick={handleClick}
              sx={{
                color: "#fff",
              }}
              aria-controls="nav-menu"
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="nav-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              sx={{
                padding: 2,
                borderRadius: 2,
              }}
            >
              <MenuItem
                sx={{
                  color: "#ff007b",
                  padding: 2,
                  borderRadius: 2,
                }}
                aria-haspopup="true"
                onClick={MoveToDashboard}
              >
                <AccountCircleIcon style={{ marginRight: "10px" }} />
                Profile
              </MenuItem>
              <MenuItem
                onClick={handleLogout}
                sx={{
                  color: "#ff007b",
                  padding: 2,
                  borderRadius: 2,
                }}
              >
                <LogoutIcon style={{ marginRight: "10px" }} />
                Logout
              </MenuItem>
            </Menu>
          </div>
        ) : (
          <button className="loginBtn" onClick={goToLogin}>
            Connexion{" "}
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
