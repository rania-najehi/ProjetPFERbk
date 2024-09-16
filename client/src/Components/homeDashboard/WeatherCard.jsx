import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { CloudOutlined } from "@mui/icons-material";

const WeatherCard = () => {
  return (
    <Card className="card_dash">
      <CardHeader
        title="Today's Weather"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent className="card-content_dash">
        <Typography variant="body1">
          <CloudOutlined className="icon_dash" /> Sunny, 25°C
        </Typography>
        <Typography variant="body2">Feels like 22°C, Light breeze</Typography>
      </CardContent>
    </Card>
  );
};

export default WeatherCard;
