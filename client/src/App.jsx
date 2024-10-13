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
import Chakala from "./Components/events/EventDetails.jsx";

import ErrorBoundary from "./Components/errorsBoundries/errorBoundry.jsx";
import Error from "./Pages/error.jsx";
const App = () => {
  const { token, setToken } = useContext(Context);
  return (
    <>
      <Router>
        <Scroller />
        <Navbar />
        <Routes>
          {/* <Route
          path="/detail/:eventId"
          element={
            <ErrorBoundary> 
              <Event />
            </ErrorBoundary>
          }
        /> */}

          <Route path="/dashboard" element={<DashboardStudent />}>
            <Route index element={<HomeDashbaord />} />

            {/* <Route  element={<MessageStudentPage />} /> */}
            <Route path="/dashboard/chat" element={<Chat />} />
            <Route path="/dashboard/event" element={<Event />} />

            <Route path="/dashboard/cv" element={<CvGenerator />} />
            <Route path="/dashboard/preview" element={<StudentPreview />} />
            <Route path="/dashboard/detail/:id" element={<Chakala />}></Route>
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
{
  /* <>
<Router>
  <Scroller />
  <Navbar />
  <Routes>
    <Route
    path="/detail/:eventId"
    element={
      <ErrorBoundary> 
        <Event />
      </ErrorBoundary>
    }
  />

    <Route
      path="/dashboard"
      element={token ? <DashboardStudent /> : <Login />}
    >
      <Route index element={token ? <HomeDashbaord /> : <Login />} />
      <></>
     
      <Route
        path="/dashboard/chat"
        element={token ? <Chat /> : <Login />}
      />
      <Route
        path="/dashboard/event"
        element={token ? <Event /> : <Login />}
      />

      <Route
        path="/dashboard/cv"
        element={token ? <CvGenerator /> : <Login />}
      />
      <Route
        path="/dashboard/preview"
        element={token ? <StudentPreview /> : <Login />}
      />
      <Route
        path="/dashboard/detail/:id"
        element={token ? <Chakala /> : <Login />}
      ></Route>
      <Route
        path="/dashboard/createCv"
        element={token ? <CreateCv /> : <Login />}
      />
      <Route
        path="/dashboard/community"
        element={token ? <Community /> : <Login />}
      />

      <Route
        path="/dashboard/jobOffer"
        element={token ? <JobOffer /> : <Login />}
      />
    </Route>
    <Route path="/" element={token ? <Home /> : <Login />} />

    <Route path="/about" element={token ? <OurProgram /> : <Login />} />
    <Route
      path="/appointment"
      element={token ? <Appointment /> : <Login />}
    />
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
</> */
}
