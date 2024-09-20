import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
  TextField,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
const OneSection = ({ section, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newContent, setNewContent] = useState(section.content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
  };

  return (
    <Accordion
      elevation={2}
      sx={{ marginBottom: 3, bgcolor: "#ff007b", padding: 1, borderRadius: 2 }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: "#fff", fontSize: 30 }} />}
      >
        <Box display="flex" alignItems="center" gap={2}>
          {section.icon}
          <Typography
            letterSpacing={3}
            fontSize={20}
            fontWeight={"meduim"}
            color="#fff"
          >
            {section.title}
          </Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ bgcolor: "white", padding: 2, borderRadius: 2 }}>
        <Box>{section.content}</Box>
      </AccordionDetails>
    </Accordion>
  );
};

export default OneSection;
