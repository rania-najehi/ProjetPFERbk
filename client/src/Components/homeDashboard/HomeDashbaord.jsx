import React, { useEffect, useState, useContext } from "react";
import WeatherCard from "./WeatherCard.jsx";
import ConnectionsCard from "./ConnectionsCard.jsx";
import TopEventsCard from "./TopEventsCard.jsx";
import UserInformationCard from "./UserInformationCard.jsx";
import TopJobsCard from "./TopJobsCard.jsx";
import { Context } from "../../main.jsx";
import axios from "axios";
import "./home.css";
const Dashboard = () => {
  const { token, setToken } = useContext(Context);
  const [user, setUser] = useState({});
  const [rooms, setRooms] = useState(0);
  const getCurrentUser = async () => {
    try {
      const data = await axios.get(
        "http://localhost:4000/api/v1/user/student/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("====================================");
      console.log("data.user", data.data.user);
      console.log("====================================");
      setUser(data.data.user);
      setRooms(data.data.user.rooms.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className="container_dash">
      <div className="section_dash">
        <UserInformationCard
          getCurrentUser={getCurrentUser}
          user={user}
          token={token}
        />
      </div>
      <div className="section_dash">
        <WeatherCard />
      </div>
      <div className="section_dash">
        <ConnectionsCard rooms={rooms} />
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
