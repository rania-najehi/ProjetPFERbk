import React from "react";
import WeatherCard from "./WeatherCard.jsx";
import ConnectionsCard from "./ConnectionsCard.jsx";
import TopEventsCard from "./TopEventsCard.jsx";
import UserInformationCard from "./UserInformationCard.jsx";
import TopJobsCard from "./TopJobsCard.jsx";
import "./home.css";
const Dashboard = () => {
  return (
    <div className="container_dash">
      <div className="section_dash">
        <UserInformationCard />
      </div>
      <div className="section_dash">
        <WeatherCard />
      </div>
      <div className="section_dash">
        <ConnectionsCard />
      </div>
      <div className="section_dash">
        <TopEventsCard />
      </div>

      <div className="section_dash">
        <TopJobsCard />
      </div>
    </div>
  );
};

export default Dashboard;
