import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@mui/material";
import { WorkOutlineOutlined } from "@mui/icons-material";

const TopJobsCard = () => {
  return (
    <Card className="card_dash">
      <CardHeader title="Top Jobs" titleTypographyProps={{ variant: "h6" }} />
      <CardContent className="card-content_dash">
        <Typography variant="body1">
          <WorkOutlineOutlined className="icon_dash" /> Senior Software Engineer
        </Typography>
        <Typography variant="body1">
          <WorkOutlineOutlined className="icon_dash" /> Data Scientist
        </Typography>
        <Typography variant="body1">
          <WorkOutlineOutlined className="icon_dash" /> Product Manager
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TopJobsCard;
