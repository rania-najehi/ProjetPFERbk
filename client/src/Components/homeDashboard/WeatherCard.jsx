import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { CloudOutlined } from "@mui/icons-material";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import axios from "axios";
const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState({
    feelslike: "22",
    weather_descriptions: "Sunny",
    temperature: 25,
    name: "New york",
    country: "United states",
  });
  const [position, setPosition] = useState({
    altitude: "36.8246784",
    longitude: "10.2039552",
  });
  const [error, setError] = useState(null);
  const getGeolocation = async () => {
    try {
      if (navigator.geolocation) {
        // Request user's permission
        navigator.geolocation.getCurrentPosition((position) => {
          console.log("position", position);

          setPosition({
            altitude: position.altitude,
            longitude: position.longitude,
          });
        });
        const options = {
          method: "GET",
          url: "https://api.weatherstack.com/current?access_key={18be584ecd3885d825ec82d2f2ee9e67}",
          params: {
            query: `${position.altitude} ${position.altitude}`,
          },
        };
      }
    } catch (error) {
      setError(error.message);
    }
    // Check if geolocation is supported
  };
  // const getWeatherData = async () => {
  //   try {
  //     const options = {
  //       method: "GET",
  //       url: "https://api.weatherstack.com/current?access_key=18be584ecd3885d825ec82d2f2ee9e67",
  //       params: {
  //         query: `${position.altitude} ${position.longitude}`,
  //       },
  //     };
  //     const currentWeather = await axios(options);
  //     setWeatherData({
  //       ...currentWeather.data.current,
  //       name: currentWeather.location.name,
  //       country: currentWeather.location.country,
  //     });
  //     console.log("currentWeather", currentWeather.data);
  //   } catch (error) {
  //     throw error;
  //   }
  // };
  useEffect(() => {
    getGeolocation();
    // getWeatherData();
  }, []);
  return (
    <Card className="card_dash">
      <CardHeader
        title="Today's Weather"
        titleTypographyProps={{ variant: "h6" }}
      />

      <CardContent className="card-content_dash">
        <Typography variant="body2">
          <FmdGoodIcon className="icon_dash" />
          {weatherData.country} /{weatherData.name}
        </Typography>
        <Typography variant="body1">
          <ThermostatIcon className="icon_dash" />{" "}
          {weatherData.weather_descriptions[0]}, {weatherData.temperature}°C
        </Typography>
        <Typography variant="body2">
          Feels like {weatherData.feelslike}°C
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
