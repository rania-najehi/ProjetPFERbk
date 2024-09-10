import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Autocomplete,
} from "@mui/material";
import { Context } from "../../../main.jsx";

import ConfirmationDialog from "../../mini-components/modal.jsx";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import { useUser } from "../../../context/cvGeneratorContext.jsx";

const techStackOptions = {
  languages: ["JavaScript", "Python", "Java", "C++", "Ruby"],
  frontend: ["React", "Vue", "Angular", "Svelte"],
  backend: ["Node.js", "Express", "Django", "Flask"],
  database: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
  cloud: ["AWS", "Azure", "Google Cloud", "Heroku"],
};

const Projects = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const { token } = useContext(Context);

  const { user, updateUserRecord, data } = useUser();
  const [projects, setProjects] = useState([
    {
      name: "",
      githubLink: "",
      description: "",
      techStack: {
        languages: [],
        frontend: [],
        backend: [],
        database: [],
        cloud: [],
      },
      startDate: "",
      endDate: "",
    },
  ]);
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
      setProjects(response.data.proj);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  useEffect(() => {
    getAllUserRecords();
  }, []);
  const handleChange = (index, event) => {
    const values = [...projects];
    const { name, value } = event.target;
    values[index][name] = value;
    setProjects(values);
  };

  const handleTechStackChange = (index, category, value) => {
    const values = [...projects];
    values[index].techStack[category] = value;
    setProjects(values);
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
  const handleAddProject = () => {
    setProjects([
      ...projects,
      {
        name: "",
        githubLink: "",
        description: "",
        techStack: {
          languages: [],
          frontend: [],
          backend: [],
          database: [],
          cloud: [],
        },
        startDate: "",
        endDate: "",
      },
    ]);
  };

  const handleRemoveProject = (index) => {
    const values = [...projects];
    values.splice(index, 1);
    setProjects(values);
    updateUserRecord({ records: projects, section: "projects" });
  };

  const handleUpdate = () => {
    // Handle update logic
    console.log(projects);
    updateUserRecord({ records: projects, section: "projects" });
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5">Tell us about your projects 💻</Typography>
      {projects.map((project, index) => (
        <Box key={index} sx={{ mt: 3, borderBottom: "1px solid #ddd", pb: 3 }}>
          <TextField
            label="Project Name"
            fullWidth
            variant="outlined"
            margin="normal"
            name="name"
            value={project.name}
            // defaultValue={project.name}
            onChange={(e) => handleChange(index, e)}
            sx={{
              "& .MuiInputLabel-root": { color: "gray" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
            }}
          />
          <TextField
            label="Describe your role in the projects and features"
            fullWidth
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            name="description"
            value={project.description}
            onChange={(e) => handleChange(index, e)}
            sx={{
              "& .MuiInputLabel-root": { color: "gray" }, // Unfocused label color
              "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" }, // Focused label color
            }}
          />
          <TextField
            label="GitHub Link"
            fullWidth
            variant="outlined"
            margin="normal"
            name="githubLink"
            value={project.githubLink}
            onChange={(e) => handleChange(index, e)}
            sx={{
              "& .MuiInputLabel-root": { color: "gray" },
              "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
            }}
          />
          {Object.keys(techStackOptions).map((category) => (
            <Autocomplete
              key={category}
              multiple
              options={techStackOptions[category]}
              getOptionLabel={(option) => option}
              value={project.techStack[category]}
              onChange={(e, value) =>
                handleTechStackChange(index, category, value)
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                  variant="outlined"
                  margin="normal"
                  sx={{
                    "& .MuiInputLabel-root": { color: "gray" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
                  }}
                />
              )}
              sx={{ mt: 1 }}
            />
          ))}
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
              value={project.startDate}
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
              value={project.endDate}
              onChange={(e) => handleChange(index, e)}
              sx={{
                "& .MuiInputLabel-root": { color: "gray" },
                "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
            <IconButton
              sx={{ color: "#ff007b", ml: "auto" }}
              onClick={() => handleRemoveProject(index)}
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
          onClick={handleAddProject}
          startIcon={<AddIcon />}
        >
          Add Project
        </Button>
        <Button
          variant="contained"
          sx={{
            fontSize: 20,
            bgcolor: "#ff007b",
            "&:hover": {
              bgcolor: "white", // Background color on hover
              color: "#ff007b",
            },
          }}
          onClick={openDialog}
        >
          Update Projects
        </Button>
      </Box>
      <ConfirmationDialog
        open={isDialogOpen}
        title="Update Projects"
        content="Are you sure you want to update projects?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Container>
  );
};

export default Projects;
