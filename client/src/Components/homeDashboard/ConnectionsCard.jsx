import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { PeopleAltOutlined } from "@mui/icons-material";

const ConnectionsCard = () => {
  return (
    <Card className="card_dash">
      <CardHeader
        title="Connections"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent className="card-content_dash">
        <Typography variant="h4">1,250</Typography>
        <Typography variant="body2">
          <PeopleAltOutlined className="icon_dash" /> New connections this week:
          15
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ConnectionsCard;
