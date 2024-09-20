import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  IconButton,
} from "@mui/material";
import { Context } from "../../../main.jsx";

import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useUser } from "../../../context/cvGeneratorContext.jsx";
import ConfirmationDialog from "../../mini-components/modal.jsx";

const skillLevels = ["Beginner", "Intermediate", "Advanced", "Expert"];
const proficiencyLevels = ["Basic", "Conversational", "Fluent", "Native"];

const Skills = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { token } = useContext(Context);

  const { user, getCurrentUser, updateUserRecord } = useUser();
  const [technicalSkills, setTechnicalSkills] = useState([
    { skill: "", level: "" },
  ]);
  const [softSkills, setSoftSkills] = useState([{ skill: "" }]);
  const [languages, setLanguages] = useState([
    { language: "", proficiency: "" },
  ]);

  const handleChange = (type, index, event) => {
    const { name, value } = event.target;
    let values;

    switch (type) {
      case "technical":
        values = [...technicalSkills];
        values[index][name] = value;
        setTechnicalSkills(values);
        break;
      case "soft":
        values = [...softSkills];
        values[index][name] = value;
        setSoftSkills(values);
        break;
      case "language":
        values = [...languages];
        values[index][name] = value;
        setLanguages(values);
        break;
      default:
        break;
    }
  };

  const handleAddSkill = (type) => {
    switch (type) {
      case "technical":
        setTechnicalSkills([...technicalSkills, { skill: "", level: "" }]);
        break;
      case "soft":
        setSoftSkills([...softSkills, { skill: "" }]);
        break;
      case "language":
        setLanguages([...languages, { language: "", proficiency: "" }]);
        break;
      default:
        break;
    }
  };

  const handleRemoveSkill = (type, index) => {
    let values;

    switch (type) {
      case "technical":
        values = [...technicalSkills];
        values.splice(index, 1);
        setTechnicalSkills(values);
        break;
      case "soft":
        values = [...softSkills];
        values.splice(index, 1);
        setSoftSkills(values);
        break;
      case "language":
        values = [...languages];
        values.splice(index, 1);
        setLanguages(values);
        break;
      default:
        break;
    }
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
    console.log({ technicalSkills, softSkills, languages });
    updateUserRecord({
      records: [{ technicalSkills, softSkills, languages }],
      section: "Skill",
    });
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
      setSoftSkills(response.data.skills.softSkills);
      setTechnicalSkills(response.data.skills.technicalSkills);
      setLanguages(response.data.skills.languages);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  useEffect(() => {
    getAllUserRecords();
  }, []);
  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5">Skills</Typography>

      {/* Technical Skills */}
      <Box sx={{ mt: 3 }}>
        <Typography variant="h6">Technical Skills</Typography>
        {technicalSkills.map((skill, index) => (
          <Box
            key={index}
            sx={{
              mt: 2,
              borderBottom: "1px solid #ddd",
              pb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <TextField
              label="Technical Skill"
              fullWidth
              variant="outlined"
              margin="normal"
              name="skill"
              value={skill.skill}
              onChange={(e) => handleChange("technical", index, e)}
              sx={{
                "& .MuiInputLabel-root": { color: "gray" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
              }}
            />
            <TextField
              label="Skill Level"
              fullWidth
              variant="outlined"
              margin="normal"
              name="level"
              select
              value={skill.level}
              onChange={(e) => handleChange("technical", index, e)}
              sx={{
                "& .MuiInputLabel-root": { color: "gray" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
              }}
            >
              {skillLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
            <IconButton
              sx={{ color: "#ff007b", mt: 1 }}
              onClick={() => handleRemoveSkill("technical", index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="outlined"
          sx={{ color: "#ff007b", mt: 2 }}
          onClick={() => handleAddSkill("technical")}
          startIcon={<AddIcon />}
        >
          Add Technical Skill
        </Button>
      </Box>

      {/* Soft Skills */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Soft Skills</Typography>
        {softSkills.map((skill, index) => (
          <Box
            key={index}
            sx={{
              mt: 2,
              borderBottom: "1px solid #ddd",
              pb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <TextField
              label="Soft Skill"
              fullWidth
              variant="outlined"
              margin="normal"
              name="skill"
              value={skill.skill}
              onChange={(e) => handleChange("soft", index, e)}
              sx={{
                "& .MuiInputLabel-root": { color: "gray" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
              }}
            />
            <IconButton
              sx={{ color: "#ff007b", mt: 1 }}
              onClick={() => handleRemoveSkill("soft", index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="outlined"
          sx={{ color: "#ff007b", mt: 2 }}
          onClick={() => handleAddSkill("soft")}
          startIcon={<AddIcon />}
        >
          Add Soft Skill
        </Button>
      </Box>

      {/* Languages */}
      <Box sx={{ mt: 5 }}>
        <Typography variant="h6">Languages</Typography>
        {languages.map((language, index) => (
          <Box
            key={index}
            sx={{
              mt: 2,
              borderBottom: "1px solid #ddd",
              pb: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <TextField
              label="Language"
              fullWidth
              variant="outlined"
              margin="normal"
              name="language"
              value={language.language}
              onChange={(e) => handleChange("language", index, e)}
              sx={{
                "& .MuiInputLabel-root": { color: "gray" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
              }}
            />
            <TextField
              label="Proficiency Level"
              fullWidth
              variant="outlined"
              margin="normal"
              name="proficiency"
              select
              value={language.proficiency}
              onChange={(e) => handleChange("language", index, e)}
              sx={{
                "& .MuiInputLabel-root": { color: "gray" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
              }}
            >
              {proficiencyLevels.map((level) => (
                <MenuItem key={level} value={level}>
                  {level}
                </MenuItem>
              ))}
            </TextField>
            <IconButton
              sx={{ color: "#ff007b", mt: 1 }}
              onClick={() => handleRemoveSkill("language", index)}
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
        <Button
          variant="outlined"
          sx={{ color: "#ff007b", mt: 2 }}
          onClick={() => handleAddSkill("language")}
          startIcon={<AddIcon />}
        >
          Add Language
        </Button>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        <Button
          variant="contained"
          sx={{
            fontSize: 13,
            bgcolor: "#ff007b",
            "&:hover": {
              bgcolor: "white", // Background color on hover
              color: "#ff007b",
            },
            mt: 5,
          }}
          onClick={openDialog}
        >
          Update Skills
        </Button>
      </Box>
      <ConfirmationDialog
        open={isDialogOpen}
        title="Update your skills"
        content="Are you sure you want to update skills?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Container>
  );
};

export default Skills;
