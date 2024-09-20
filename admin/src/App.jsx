import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/Login/Login.jsx";
import Messages from "./components/Message/Message.jsx";
import AddNewAdmin from "./components/AddAdmin/AddNewAdmin.jsx";
import { Context } from "./main.jsx";
import axios from "axios";
import SideBar from "./components/SideBar/SideBar.jsx";
import "./App.css";
import Students from "./components/Students/Students.jsx";
import Dashbord from "./components/Dashbord/Dashbord.jsx";
import JobOffer from "./components/JobOffer/JobOffer.jsx";
import Events from "./components/Events/Events.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import AdminUsersTable from "./components/displayUsers/usersTable.jsx";
import MainChat from "./components/chatbot/MainChat.jsx";
const App = () => {
  const { token } = useContext(Context);
  const [loading, setLoading] = useState(true);

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="container_dash">
      <Router>
        <SideBar />
        <div className="All_sections">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={token ? <Dashbord /> : <Navigate to="/login" />}
            />
            <Route
              path="/admin/addnew"
              element={token ? <AddNewAdmin /> : <Navigate to="/login" />}
            />
            <Route
              path="/messages"
              element={token ? <MainChat /> : <Navigate to="/login" />}
            />
            <Route
              path="/students"
              element={token ? <AdminUsersTable /> : <Navigate to="/login" />}
            />

            <Route
              path="/job"
              element={token ? <JobOffer /> : <Navigate to="/login" />}
            />
            <Route
              path="/events"
              element={token ? <Events /> : <Navigate to="/events" />}
            />
          </Routes>
        </div>
        <ToastContainer position="top-center" />
      </Router>
    </div>
  );
};

export default App;
