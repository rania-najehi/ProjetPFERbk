import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  IconButton,
  Checkbox,
} from "@mui/material";
import ConfirmationDialog from "../../mini-components/modal.jsx";
import { Context } from "../../../main.jsx";

import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useUser } from "../../../context/cvGeneratorContext.jsx";
const Education = () => {
  const { token } = useContext(Context);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const [educations, setEducations] = useState([
    {
      degree: "",
      college: "",
      level: "",
      startDate: "",
      endDate: "",
      stillEnrolled: false,
    },
  ]);
  const { user, getCurrentUser, updateUserRecord } = useUser();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const handleChange = (index, event) => {
    const values = [...educations];
    const { name, value, type, checked } = event.target;
    values[index][name] = type === "checkbox" ? checked : value;
    setEducations(values);
  };
  const getAllUserRecords = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getSections", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("====================================");
      console.log(response.data);
      console.log("====================================");
      setEducations(response.data.education);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  useEffect(() => {
    getAllUserRecords();
  }, []);
  const handleAddEducation = () => {
    setEducations([
      ...educations,
      {
        degree: "",
        college: "",
        level: "",
        startDate: "",
        endDate: "",
        stillEnrolled: false,
      },
    ]);
  };

  const handleRemoveEducation = (index) => {
    const values = [...educations];
    values.splice(index, 1);
    setEducations(values);
    updateUserRecord({ records: educations, section: "education" });
  };
  // ************************************
  const handleConfirm = () => {
    console.log("Confirmed!");
    // Place your confirmation logic here
    handleUpdate();
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  const openDialog = () => {
    setDialogOpen(true);
  };

  // **************************************
  const handleUpdate = () => {
    // Handle update logic
    console.log(educations);
    updateUserRecord({ records: educations, section: "education" });
  };

  const educationLevels = [
    "High School",
    "Associate",
    "Bachelor's",
    "Master's",
    "Doctorate",
    "Other",
  ];

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5">Tell us about your education 🎓</Typography>
      {educations.map((education, index) => (
        <Box key={index} sx={{ mt: 3, borderBottom: "1px solid #ddd", pb: 3 }}>
          <TextField
            label="Degree"
            fullWidth
            variant="outlined"
            margin="normal"
            name="degree"
            value={education.degree}
            onChange={(e) => handleChange(index, e)}
            sx={{
              "& .MuiInputLabel-root": { color: "gray" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
            }}
          />
          <TextField
            label="College"
            fullWidth
            variant="outlined"
            margin="normal"
            name="college"
            value={education.college}
            onChange={(e) => handleChange(index, e)}
            sx={{
              "& .MuiInputLabel-root": { color: "gray" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
            }}
          />
          <TextField
            label="Level of Education"
            fullWidth
            variant="outlined"
            margin="normal"
            name="level"
            select
            value={education.level}
            onChange={(e) => handleChange(index, e)}
            sx={{
              "& .MuiInputLabel-root": { color: "gray" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
            }}
          >
            {educationLevels.map((level) => (
              <MenuItem key={level} value={level}>
                {level}
              </MenuItem>
            ))}
          </TextField>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
          >
            <TextField
              label="Start Date"
              type="month"
              fullWidth
              variant="outlined"
              margin="normal"
              name="startDate"
              value={education.startDate}
              onChange={(e) => handleChange(index, e)}
              sx={{
                "& .MuiInputLabel-root": { color: "gray" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
              }}
            />
            <TextField
              label="End Date"
              type="month"
              fullWidth
              variant="outlined"
              margin="normal"
              name="endDate"
              value={education.endDate}
              onChange={(e) => handleChange(index, e)}
              disabled={education.stillEnrolled}
              sx={{
                "& .MuiInputLabel-root": { color: "gray" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <Checkbox
              defaultChecked={education.stillEnrolled}
              name="stillEnrolled"
              onChange={(e) => handleChange(index, e)}
            />
            <Typography sx={{ ml: 1 }}>Still Enrolled</Typography>
            <IconButton
              sx={{ color: "#ff007b", ml: "auto" }}
              onClick={() => handleRemoveEducation(index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>
      ))}
      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button
          variant="outlined"
          sx={{ color: "#ff007b" }}
          onClick={handleAddEducation}
          startIcon={<AddIcon />}
        >
          Add Education
        </Button>
        <Button
          variant="contained"
          sx={{
            ml: 2,
            fontSize: 13,
            bgcolor: "#ff007b",
            "&:hover": {
              bgcolor: "white", // Background color on hover
              color: "#ff007b",
            },
          }}
          onClick={openDialog}
        >
          Update Education
        </Button>
      </Box>
      <ConfirmationDialog
        open={isDialogOpen}
        title="Update Education"
        content="Are you sure you want to update education?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Container>
  );
};

export default Education;
