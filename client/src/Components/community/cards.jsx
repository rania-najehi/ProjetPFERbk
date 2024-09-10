import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import { LinkedIn, GitHub, Add } from "@mui/icons-material";

const UserCard = ({ navigateContactToChat, user, connect, createRoom }) => {
  return (
    <Card
      sx={{
        padding: 2,
        width: "100%",
        boxShadow: 3,
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.05)" },
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={4}>
          <Avatar
            src={user.studentAvatar}
            alt={user._id}
            sx={{ width: 150, height: 150 }}
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Typography variant="h5">
              {user.firstName} {user.lastName}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.genre}
            </Typography>
            <Typography variant="body1" color="textSecondary">
              {user.role}
            </Typography>
            <Typography variant="body2" sx={{ marginY: 1 }}>
              {user.about}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", marginTop: 1 }}>
              <IconButton
                href={user.github}
                target="_blank"
                // color="primary"
                sx={{
                  marginRight: 1,
                  color: user.role === "Student" ? "#ff007b" : "#8436a1",
                  "&:hover": {
                    color: user.role === "Student" ? "#ff007b" : "#8436a1",
                    background: "white",
                  },
                }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                sx={{
                  marginRight: 1,
                  color: user.role === "Student" ? "#ff007b" : "#8436a1",
                  "&:hover": {
                    color: user.role === "Student" ? "#ff007b" : "#8436a1",
                    background: "white",
                  },
                }}
                href={user.linkedin}
                target="_blank"
              >
                <LinkedIn />
              </IconButton>
            </Box>
            {!connect && (
              <Button
                onClick={() => createRoom(user._id)}
                variant="contained"
                startIcon={<Add sx={{ color: "white" }} />}
                sx={{
                  marginTop: 2,
                  background: user.role === "Student" ? "#ff007b" : "#8436a1",
                  "&:hover": {
                    color: user.role === "Student" ? "#ff007b" : "#8436a1",
                    background: "white",
                  },
                }}
              >
                Connect
              </Button>
            )}
            {connect && (
              <Button
                onClick={navigateContactToChat}
                variant="contained"
                startIcon={<Add sx={{ color: "white" }} />}
                sx={{
                  marginTop: 2,
                  background: user.role === "Student" ? "#ff007b" : "#8436a1",
                  "&:hover": {
                    color: user.role === "Student" ? "#ff007b" : "#8436a1",
                    background: "white",
                  },
                }}
              >
                contact
              </Button>
            )}
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserCard;
