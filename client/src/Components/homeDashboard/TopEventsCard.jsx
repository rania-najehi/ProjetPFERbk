import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { EventOutlined } from "@mui/icons-material";

const TopEventsCard = () => {
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
    </Card>
  );
};

export default TopEventsCard;
