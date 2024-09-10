import React, { useState, useContext, useLayoutEffect, useEffect } from "react";
import "./Navbar.css";
import { redirect } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../../main";
import axios from "axios";
import { toast } from "react-toastify";

import logo from "../../images/rbk logo.png";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { token, setToken } = useContext(Context);
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("token");
    try {
      const data = await axios.get(
        "http://localhost:4000/api/v1/user/student/logout",
        { withCredentials: true }
      );
      console.log("logout happend", data.data);
    } catch (error) {
      console.log(error);
    }
    setToken(null);
    navigateTo("/login");
  };

  const goToLogin = () => {
    navigateTo("/login");
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
          <button className="loginBtn" onClick={handleLogout}>
            Déconnexion
          </button>
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
