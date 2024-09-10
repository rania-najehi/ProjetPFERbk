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

const UserCard = ({ user }) => {
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
            src={user.avatar}
            alt={user.name}
            sx={{ width: 200, height: 200 }}
          />
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <Typography variant="h5">{user.name}</Typography>
            <Typography variant="body1" color="textSecondary">
              {user.job}
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
                  color: "#ff007b",
                  "&:hover": { color: "#ff007b", background: "white" },
                }}
              >
                <GitHub />
              </IconButton>
              <IconButton
                sx={{
                  marginRight: 1,
                  color: "#ff007b",
                  "&:hover": { color: "#ff007b", background: "white" },
                }}
                href={user.linkedin}
                target="_blank"
              >
                <LinkedIn />
              </IconButton>
            </Box>
            <Button
              variant="contained"
              startIcon={<Add sx={{ color: "white" }} />}
              sx={{
                marginTop: 2,
                background: "#ff007b",
                "&:hover": { color: "#ff007b", background: "white" },
              }}
            >
              Connect
            </Button>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserCard;
