import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { AccountCircleOutlined } from "@mui/icons-material";

import UpdateInformationForm from "./dialogue.jsx"; // Import the popup form
const UserInformationCard = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (updatedInfo) => {
    // Send a request to your backend to update the user information
    console.log("Updated information:", updatedInfo); // Replace with your backend update logic
  };
  return (
    <Card className="card_dash">
      <CardHeader
        title="User Information"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent className="card-content_dash">
        <Typography variant="body1">
          <AccountCircleOutlined className="icon_dash" /> John Doe
        </Typography>
        <Typography variant="body2">john.doe@example.com</Typography>
        <Typography variant="body2">Member since: June 2023</Typography>
      </CardContent>
      <div className="card-footer_dash">
        <Button variant="contained" onClick={handleOpen}>
          Update Information
        </Button>
      </div>
      <UpdateInformationForm
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
    </Card>
  );
};

export default UserInformationCard;
