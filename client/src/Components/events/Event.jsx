import React, { useEffect, useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Pagination,
  Divider,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EventIcon from "@mui/icons-material/Event";
import ResponsiveDatePickers from "../calendar/calendar.jsx";
import axios from "axios";
import dayjs from "dayjs";
import "react-calendar/dist/Calendar.css"; // Import the react-calendar CSS
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SmsIcon from "@mui/icons-material/Sms";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../../main.jsx";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import moment from "moment";

// // import "./event.css";

const Event = () => {
  const { token, setToken } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true); // Track loading
  const [error, setError] = useState(null); // Track errors
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  // Use state for selectedDate
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [subscribed, setSubscribed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState(false);
  const handleEventClick = (event) => {
    navigate(`/dashboard/detail/${event._id}`, { state: { event, user } });
  };
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/comment`, {
        params: {
          subscribed,
          date: selectedDate,
          page: currentPage,
          limit: 4,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("event", response.data);

      setEvents(response.data.events);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
      setIsLoading(false);
    } catch (error) {
      console.error("Error get event:", error);
      setError("Failed to get event.");
      setIsLoading(false);
    }
  };
  const getCurrentUser = async () => {
    setIsLoading(true);
    try {
      const data = await axios.get(
        "http://localhost:4000/api/v1/user/student/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data.user", data.data.user.rooms);
      setUser(data.data.user);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  useEffect(() => {
    fetchEvents();
  }, [filter]);
  const handleDateChange = (date) => {
    const eventDate = dayjs(date);
    console.log(eventDate);
    setSelectedDate(eventDate);
    setSubscribed(false);
    setCurrentPage(1);
    setTotalPages(1);
    setFilter(!filter);
    // Optionally, you can filter events based on the selected date
  };
  const handleAllEvents = () => {
    setSubscribed(false);
    setCurrentPage(1);
    setTotalPages(1);
    setSelectedDate(null);
    setFilter(!filter);
  };
  const handleMyEvents = () => {
    setSubscribed(true);
    setCurrentPage(1);
    setTotalPages(1);
    setSelectedDate(null);
    setFilter(!filter);
  };
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
    setFilter(!filter);
  };
  if (error) return <Typography>{error}</Typography>;
  if (isLoading) {
    return <div className="loader2"></div>;
  }
  return (
    <div
      style={{ backgroundColor: "#f5f5f5", width: "100%", minHeight: "100vh" }}
    >
      {/* Header */}
      <AppBar position="static" style={{ backgroundColor: "#000" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            RBK Evently
          </Typography>
          <Button color="inherit" onClick={handleAllEvents}>
            All events
          </Button>
          <Button color="inherit" onClick={handleMyEvents}>
            My Events
          </Button>
        </Toolbar>
      </AppBar>

      {/* Calendar */}
      <Box display="flex" width={"100%"}>
        {" "}
        <Box padding="20px">
          <ResponsiveDatePickers
            selectedDate={selectedDate} // Pass the value
            handleDateChange={handleDateChange} // Pass the function
          />
        </Box>
        {/* Events List */}
        <Grid container spacing={2} style={{ padding: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h6">My Events</Typography>
            <Divider style={{ margin: "10px 0" }} />

            {events.map((event) => (
              <Card
                key={event._id}
                onClick={() => handleEventClick(event)}
                style={{ marginBottom: "10px", cursor: "pointer" }}
              >
                <CardContent>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item>
                      <Grid container alignItems="center" spacing={2}>
                        <Grid item>
                          <img
                            src={event.images[0]}
                            alt={event.title}
                            style={{ width: "100px", borderRadius: "8px" }}
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">{event.title}</Typography>
                          <Typography variant="body2">
                            {moment(event.date).format("MMM Do YY")}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={20}>
                        <Grid item>
                          <PeopleAltIcon sx={{ color: "#ff007b" }} />{" "}
                          {event.ups.length}
                        </Grid>
                        <Grid item>
                          <SmsIcon sx={{ color: "#ff007b" }} />{" "}
                          {event.comments.length}
                        </Grid>
                        <Grid item>
                          <FavoriteBorderIcon sx={{ color: "#ff007b" }} />{" "}
                          {event.likes.length}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
            <Pagination
              // sx={{
              //   boxShadow: 3,
              //   transition: "transform 0.3s ease",
              //   "&:hover": { transform: "scale(1.05)" },
              // }}
              count={totalPages}
              page={currentPage}
              onChange={handleChangePage}
              sx={{
                color: "#ff007b",
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Event;
