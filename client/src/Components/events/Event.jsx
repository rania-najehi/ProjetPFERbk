import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EventIcon from "@mui/icons-material/Event";
import ResponsiveDatePickers from "../calendar/calendar.jsx";
import "react-calendar/dist/Calendar.css"; // Import the react-calendar CSS
// import "./event.css";
const events = [
  {
    id: 1,
    title: "Talan's 8th Birthday Party",
    date: "July 09, 2022",
    attendees: 11,
    comments: 3,
    files: 2,
    image: "https://via.placeholder.com/100", // Replace with your image URL
    description: "This is the description for Talan's 8th Birthday Party.",
  },
  // Add more event objects
];

const Dashboard = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // Optionally, you can filter events based on the selected date
  };

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
          <Button color="inherit">All events</Button>
          <Button color="inherit">My Events</Button>
        </Toolbar>
      </AppBar>

      {/* Calendar */}
      <Box display="flex" width={"100%"}>
        {" "}
        <Box padding="20px">
          <ResponsiveDatePickers />
          {/* Event Detail Card */}
          {/* {selectedEvent && (
            <Grid item xs={12}>
              <Card style={{ marginTop: "20px" }}>
                <CardContent>
                  <Typography variant="h5">{selectedEvent.title}</Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{ marginBottom: "20px" }}
                  >
                    {selectedEvent.date}
                  </Typography>
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    style={{
                      width: "100%",
                      maxHeight: "300px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography variant="body1" style={{ marginTop: "20px" }}>
                    {selectedEvent.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          )} */}
        </Box>
        {/* Events List */}
        <Grid container spacing={2} style={{ padding: "20px" }}>
          <Grid item xs={12}>
            <Typography variant="h6">My Events</Typography>
            <Divider style={{ margin: "10px 0" }} />

            {events.map((event) => (
              <Card
                key={event.id}
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
                            src={event.image}
                            alt={event.title}
                            style={{ width: "100px", borderRadius: "8px" }}
                          />
                        </Grid>
                        <Grid item>
                          <Typography variant="h6">{event.title}</Typography>
                          <Typography variant="body2">{event.date}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <Grid container spacing={20}>
                        <Grid item>
                          <PersonIcon /> {event.attendees}
                        </Grid>
                        <Grid item>
                          <ChatBubbleIcon /> {event.comments}
                        </Grid>
                        <Grid item>
                          <EventIcon /> {event.files}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Dashboard;
