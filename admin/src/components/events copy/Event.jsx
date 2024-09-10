import React from "react";
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
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import EventIcon from "@mui/icons-material/Event";
import "./event.css";
const dates = [
  { day: "05", weekday: "Tuesday" },
  { day: "06", weekday: "Wednesday" },
  { day: "07", weekday: "Thursday" },
  { day: "08", weekday: "Friday" },
  { day: "09", weekday: "Saturday" },
  { day: "10", weekday: "Sunday" },
  { day: "10", weekday: "Sunday" },
  { day: "10", weekday: "Sunday" },
  { day: "10", weekday: "Sunday" },
  { day: "10", weekday: "Sunday" },
  //   { day: "10", weekday: "Sunday" },
  //   { day: "10", weekday: "Sunday" },
  //   { day: "10", weekday: "Sunday" },
  //   { day: "10", weekday: "Sunday" },
  //   { day: "10", weekday: "Sunday" },
  //   { day: "10", weekday: "Sunday" },
  //   { day: "10", weekday: "Sunday" },
  //   { day: "10", weekday: "Sunday" },
];

const events = [
  {
    title: "Talan's 8th Birthday Party",
    date: "July 09, 2022",
    attendees: 11,
    comments: 3,
    files: 2,
  },
  {
    title: "Toby Mac Concert",
    date: "August 24, 2022",
    attendees: 7,
    comments: 2,
    files: 8,
  },
  {
    title: "Friendcation to Hawaii",
    date: "September 14, 2022",
    attendees: 4,
    comments: 2,
    files: 12,
  },
  {
    title: "Anniversary Party",
    date: "October 23, 2022",
    attendees: 22,
    comments: 8,
    files: 2,
  },
];

const Event = () => {
  return (
    <div
      style={{
        width: "100%",
        // textAlign: "center",
        // display: "flex",
        // justifyContent: "center",
        // flexDirection: "column",
        // alignItems: "center",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <AppBar position="static" style={{ backgroundColor: "#000" }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Evently
          </Typography>
          <Button color="inherit">Invites</Button>
          <Button color="inherit">My Events</Button>
          <Button color="inherit">
            <PersonIcon />
            Kaleb Schultz
          </Button>
        </Toolbar>
      </AppBar>

      {/* Date Selector */}
      <div style={{ padding: "20px", backgroundColor: "#000", color: "#fff" }}>
        <div style={{ overflowX: "auto", whiteSpace: "nowrap" }}>
          {dates.map((date, index) => (
            <Grid
              key={index}
              item
              style={{
                display: "inline-block",
                textAlign: "center",
                minWidth: "100px",
                padding: "10px 20px",
              }}
            >
              <Typography variant="h4">{date.day}</Typography>
              <Typography>{date.weekday}</Typography>
            </Grid>
          ))}
        </div>
        <div style={{ marginTop: "10px", textAlign: "center" }}>
          <Button variant="contained" style={{ backgroundColor: "#0f0" }}>
            + Create
          </Button>
        </div>
      </div>

      {/* Events List */}
      <Grid container spacing={2} style={{ padding: "20px" }}>
        <Grid item xs={8}>
          <Typography variant="h6">My Events</Typography>
          <Divider style={{ margin: "10px 0" }} />

          {events.map((event, index) => (
            <Card key={index} style={{ marginBottom: "10px" }}>
              <CardContent>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography variant="h6">{event.title}</Typography>
                    <Typography variant="body2">{event.date}</Typography>
                  </Grid>
                  <Grid item>
                    <Grid container spacing={2}>
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

        {/* Side Panel */}
        <Grid item xs={4}>
          <Button
            variant="contained"
            fullWidth
            style={{ backgroundColor: "#000", color: "#fff" }}
          >
            + Create Event
          </Button>
          <Card style={{ marginTop: "20px" }}>
            <CardContent>
              <Typography variant="body2">
                Got something new to celebrate? Invite your friends to join you!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Event;
