import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
} from "@mui/material";
import { PeopleAltOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
const ConnectionsCard = ({ user, rooms }) => {
  const navigate = useNavigate();
  return (
    <Card className="card_dash">
      <CardHeader
        title="Connections"
        titleTypographyProps={{ variant: "h6" }}
      />
      <CardContent className="card-content_dash">
        <Typography variant="h4">{rooms}</Typography>
        <Typography variant="body2">
          <PeopleAltOutlined className="icon_dash" /> New connections this week:
          15
        </Typography>
      </CardContent>
      <div className="card-footer_dash">
        <Button
          onClick={() => navigate("/dashboard/community")}
          variant="contained"
        >
          See more
        </Button>
      </div>
    </Card>
  );
};

export default ConnectionsCard;
