import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import moment from "moment";
import { AccountCircleOutlined } from "@mui/icons-material";
import axios from "axios";
import UpdateInformationForm from "./dialogue.jsx"; // Import the popup form
const UserInformationCard = ({ user, token, getCurrentUser }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const calculateDuration = (createdAt) => {
    const now = moment();
    const created = moment(createdAt);
    return moment.duration(now.diff(created)).humanize();
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (updatedInfo) => {
    // Send a request to your backend to update the user information
    // console.log("Updated information:", updatedInfo.values("password"));
    // for (const [key, value] of updatedInfo.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
    // Replace with your backend update logic
    try {
      const data = await axios.put(
        "http://localhost:4000/api/v1/user/update",
        updatedInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("====================================");
      console.log("update", data);
      console.log("====================================");
      getCurrentUser();
    } catch (error) {
      throw error;
      console.log(error);
    }
  };
  return (
    <Card className="card_dash">
      <CardHeader
        title="User Information"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent className="card-content_dash">
        <Typography variant="body1">
          <AccountCircleOutlined className="icon_dash" />
          {`${user.firstName} ${user.lastName}`}
        </Typography>
        <Typography variant="body2">{user.email}</Typography>
        <Typography variant="body2">
          {calculateDuration(user.createdAt)}
        </Typography>
      </CardContent>
      <div className="card-footer_dash">
        <Button variant="contained" onClick={handleOpen}>
          Update Information
        </Button>
      </div>
      <UpdateInformationForm
        open={open}
        user={user}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default UserInformationCard;
