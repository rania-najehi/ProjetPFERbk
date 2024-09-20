import React from "react";
import {
  Card,
  Button,
  CardHeader,
  CardContent,
  Typography,
} from "@mui/material";
import { EventOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const TopEventsCard = () => {
  const navigate = useNavigate();
  return (
    <Card className="card_dash">
      <CardHeader title="Top Events" titleTypographyProps={{ variant: "h6" }} />
      <CardContent className="card-content_dash">
        <Typography variant="body1">
          <EventOutlined className="icon_dash" /> Web Summit 2024
        </Typography>
        <Typography variant="body1">
          <EventOutlined className="icon_dash" /> TechCrunch Disrupt
        </Typography>
        <Typography variant="body1">
          <EventOutlined className="icon_dash" /> SXSW
        </Typography>
      </CardContent>
      <div className="card-footer_dash">
        <Button
          variant="contained"
          onClick={() => navigate("/dashboard/event")}
        >
          See more
        </Button>
      </div>
    </Card>
  );
};

export default TopEventsCard;
