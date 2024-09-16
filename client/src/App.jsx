import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Community from "./Pages/Com.jsx";
import CreateCv from "./Components/cvGenerator/createCv/createCv.jsx";
import { ToastContainer } from "react-toastify";
import StudentPreview from "./Components/cvGenerator/sectionContent/preview.jsx";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home.jsx";
import OurProgram from "./Pages/OurProgram.jsx";
import Appointment from "./Pages/Appointment.jsx";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { Context } from "./main.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import DashboardStudent from "./Pages/DashboardStudent.jsx";
import MessageStudentPage from "./Pages/MessageStudentPage.jsx";
import CVStudent from "./Components/CVStudent/GneneateCV.jsx";
import "./App.css";
import JobOffer from "./Pages/JobOffer.jsx";
import Footer from "./Components/Footer/Footer.jsx";
import Scroller from "./Pages/Scoller.jsx";
import Chat from "./Pages/chat.jsx";
import Event from "./Pages/Events.jsx";
import "./App.css";
import CvGenerator from "./Pages/CvGenerator.jsx";
import HomeDashbaord from "./Pages/homeDashboard.jsx";
const App = () => {
  const { token, setToken } = useContext(Context);
  return (
    <>
      <Router>
        <Scroller />
        <Navbar />
        <Routes>
          <Route path="/dashboard" element={<DashboardStudent />}>
            <Route index element={<HomeDashbaord />} />

            {/* <Route  element={<MessageStudentPage />} /> */}
            <Route path="/dashboard/chat" element={<Chat />} />
            <Route path="/dashboard/event" element={<Event />} />

            <Route path="/dashboard/cv" element={<CvGenerator />} />
            <Route path="/dashboard/preview" element={<StudentPreview />} />
            <Route path="/dashboard/createCv" element={<CreateCv />} />
            <Route path="/dashboard/community" element={<Community />} />

            <Route path="/dashboard/jobOffer" element={<JobOffer />} />
          </Route>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<OurProgram />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/CV" element={<CVStudent />} />
        </Routes>
        <Routes>
          <Route path="/dashboard/*" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};

export default App;
