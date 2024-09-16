import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  InputLabel,
  Input,
} from "@mui/material";

const UpdateInformationForm = ({ open, onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [avatarFile, setAvatarFile] = useState(null); // State for avatar file

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("password", password);
    formData.append("bio", bio);
    formData.append("avatar", avatarFile); // Append the avatar file

    onSubmit(formData);
    onClose();
  };

  const handleAvatarChange = (event) => {
    setAvatarFile(event.target.files[0]);
  };
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Information</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter your new information:</DialogContentText>
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="dense"
            id="bio"
            label="Bio"
            type="text"
            fullWidth
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
          <InputLabel htmlFor="avatar-upload">Avatar</InputLabel>
          <Input
            accept="image/*"
            id="avatar-upload"
            type="file"
            onChange={handleAvatarChange}
          />
          <Button type="submit" variant="contained">
            Update
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateInformationForm;
