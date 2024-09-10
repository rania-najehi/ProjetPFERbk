import React from "react";
import Description from "../Components/Description/Description";
import Presentation from "../Components/Presentation/Presentation";
import StudentJob from "../Components/StudentJob/StudentJob";
import MessageForm from "../Components/MessageForm/messageForm";
import axios from "axios";

const Home = () => {
  const getCookie = async () => {
    try {
      const data = await axios.post(
        "http://localhost:4000/update-tracking",
        {
          timeSpent: "sfdfsf",
          scrollPosition: "scwccc",
        },
        { headers: { withCredentials: true } }
      );
      console.log("data", data);
    } catch (error) {
      console.log("error", error);
    }
  };
  return (
    <>
      <Description />
      <Presentation />
      <StudentJob />
      <MessageForm />
    </>
  );
};

export default Home;
