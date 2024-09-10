import React, { useEffect, useState, useContext } from "react";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Context } from "../../../main.jsx";

import { KeyTwoTone, PhotoCamera } from "@mui/icons-material";
import ConfirmationDialog from "../../mini-components/modal.jsx";
import axios from "axios";
import useForm from "../../../helpers/useForm.jsx";
import validate from "../../../helpers/validate.jsx";

const Information = () => {
  const { token } = useContext(Context);

  const [preview, setPreview] = useState(null);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [img, setImage] = useState("");
  const initialState = {
    profilePhoto: {
      value:
        "http://localhost:4000/uploads/6d90f194-62e6-414a-8095-ec9348e109de.jpg",
      touched: false,
      required: false,
    },
    github: {
      value: "",
      touched: false,
      required: true,
      requiredMessage: "GitHub URL is required!",
    },
    linkedin: {
      value: "",
      touched: false,
      required: true,
      requiredMessage: "LinkedIn URL is required!",
    },
    about: {
      value: "",
      touched: false,
      required: true,
      requiredMessage: "About section is required!",
    },
  };

  const { formData, errors, changeHandler, setFormData } = useForm(
    initialState,
    validate
  );
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
  const getCurrentUser = async () => {
    try {
      const { data } = await axios(
        "http://localhost:4000/api/v1/user/student/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("user", data.user);
      setFormData({
        profilePhoto: {
          value: `http://localhost:4000/uploads/${data.user.studentAvatar}`,
          touched: false,
          required: false,
        },
        github: {
          value: data.user.github,
          touched: false,
          required: true,
          requiredMessage: "GitHub URL is required!",
        },
        linkedin: {
          value: data.user.linkedin,
          touched: false,
          required: true,
          requiredMessage: "LinkedIn URL is required!",
        },
        about: {
          value: data.user.about,
          touched: false,
          required: true,
          requiredMessage: "About section is required!",
        },
      });
      setImage(data.user.studentAvatar);
    } catch (error) {
      console.log(error);
    }
  };
  const handleProfilePhotoChange = (event) => {
    setPreview(event.target.files[0]);
  };
  useEffect(() => {
    getCurrentUser();
  }, []);
  const handleUpdate = async () => {
    // Handle update logic
    console.log({
      github: formData.github.value,
      linkedin: formData.linkedin.value,
      about: formData.about.value,
      studentAvatar: img,
      file: preview,
    });
    try {
      const form = new FormData();
      form.append("github", formData.github.value);
      form.append("linkedin", formData.linkedin.value);
      form.append("about", formData.about.value);
      form.append("studentAvatar", img);
      form.append("file", preview);
      console.log("form", form);
      const { data } = await axios.put(
        "http://localhost:4000/api/v1/user/updateCv",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("updated", data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container sx={{ mt: 3 }}>
      <Typography variant="h5">
        Let's start and get to know you better!!! 😊
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar
          src={
            preview ? URL.createObjectURL(preview) : formData.profilePhoto.value
          }
          sx={{ width: 100, height: 100, mr: 2 }}
        />
        <Tooltip title="Upload profile photo">
          <IconButton color="primary" component="label">
            <PhotoCamera sx={{ color: "#ff007b", fontSize: 40 }} />
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleProfilePhotoChange}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 3,
          mt: 3,
        }}
      >
        <TextField
          label="Github"
          fullWidth
          variant="outlined"
          margin="normal"
          name="github"
          value={formData.github.value}
          onChange={changeHandler}
          error={!!errors.github}
          helperText={errors.github}
          sx={{
            "& .MuiInputLabel-root": { color: "gray" }, // Unfocused label color
            "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" }, // Focused label color
          }}
        />
        <TextField
          label="LinkedIn"
          fullWidth
          variant="outlined"
          margin="normal"
          name="linkedin"
          value={formData.linkedin.value}
          onChange={changeHandler}
          error={!!errors.linkedin}
          helperText={errors.linkedin}
          sx={{
            "& .MuiInputLabel-root": { color: "gray" }, // Unfocused label color
            "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" }, // Focused label color
          }}
        />
      </Box>
      <TextField
        label="Tell us about your skills, strengths, work style, and personality."
        fullWidth
        variant="outlined"
        margin="normal"
        multiline
        rows={4}
        name="about"
        value={formData.about.value}
        onChange={changeHandler}
        error={!!errors.about}
        helperText={errors.about}
        sx={{
          "& .MuiInputLabel-root": { color: "gray" }, // Unfocused label color
          "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" }, // Focused label color
        }}
      />
      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
        <Button
          variant="contained"
          sx={{
            ml: 2,
            fontSize: 20,
            bgcolor: "#ff007b",
            "&:hover": {
              bgcolor: "white", // Background color on hover
              color: "#ff007b",
            },
          }}
          onClick={openDialog}
        >
          Update information
        </Button>
      </Box>
      <ConfirmationDialog
        open={isDialogOpen}
        title="Update information"
        content="Are you sure you want to update information?"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </Container>
  );
};

export default Information;
