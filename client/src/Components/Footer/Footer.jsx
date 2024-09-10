import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import logo from "/logo.png";
import "./Footer.css";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Lundi",
      time: "9:00 AM - 17:00 AM",
    },
    {
      id: 2,
      day: "Mardi",
      time: "9:00 AM - 17:00 AM",
    },
    {
      id: 3,
      day: "Mercredi",
      time: "9:00 AM - 17:00 AM",
    },
    {
      id: 4,
      day: "Jeudi",
      time: "9:00 AM - 17:00 AM",
    },
    {
      id: 5,
      day: "Vendredi",
      time: "9:00 AM - 17:00 AM",
    },
    {
      id: 6,
      day: "Samedi",
      time: "9:00 AM - 11:00 PM",
    },
  ];

  return (
    <footer>
      <div className="contentt">
        <div className="content_section">
          <img src={logo} alt="logo" className="logo-img" />
        </div>
        <div className="content_section">
          <h4 className="-title">Services</h4>
          <ul style={{ display: "flex", flexDirection: "column" }}>
            <Link className="footer-link" to={"/"}>
              Accueil
            </Link>
            <Link className="footer-link" to={"/appointment"}>
              Rendez-vous
            </Link>
            <Link className="footer-link" to={"/about"}>
              À propos
            </Link>
          </ul>
        </div>
        <div className="content_section">
          <h4 className="footer-title">Heures de travail</h4>
          <ul className="list-time">
            {hours.map((element) => (
              <li key={element.id}>
                <span>{element.day}</span>
                <span>{element.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="content_section">
          <h4 className="footer-title">Contact</h4>
          <div className="elem">
            <FaPhone />
            <span>+216 71 85 85 85</span>
          </div>
          <div className="elem">
            <MdEmail />
            <span>hello@rbk.tn</span>
          </div>
          <div className="elem">
            <FaLocationArrow />
            <span>B24, Technopark Elghazela ariana, 2088, Tunisie</span>
            <a
              href="https://www.google.com/maps/place/ReBootKamp+(RBK+Tunis)/@36.8943529,10.1842139,17z/data=!4m14!1m7!3m6!1s0x12e2cb32a574f131:0x736d6f5853a1bd2e!2sReBootKamp+(RBK+Tunis)!8m2!3d36.8943486!4d10.1867888!16s%2Fg%2F11hz6lg210!3m5!1s0x12e2cb32a574f131:0x736d6f5853a1bd2e!8m2!3d36.8943486!4d10.1867888!16s%2Fg%2F11hz6lg210?entry=ttu"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaMapMarkerAlt className="map-icon" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
