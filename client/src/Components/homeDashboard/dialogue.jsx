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
  FormControl,
  FormHelperText,
  Select,
  MenuItem,
  styled,
  Avatar,
} from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate"; // Import icon

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ff007b",
  color: "white",
  border: "2px solid #ff007b",
  "&:hover": {
    backgroundColor: "#c20052",
  },
}));
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray", // Default border color
      transition: "border-color 0.3s ease-in-out", // Add a transition for smooth color change
    },
    "&:hover fieldset": {
      borderColor: "#ff007b", // Border color on hover
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff007b", // Border color on focus
    },
  },
  "& .MuiFormLabel-root": {
    color: "gray", // Default label color
    "&.Mui-focused": {
      color: "#ff007b", // Label color on focus
    },
  },
}));
const UpdateInformationForm = ({ open, onClose, onSubmit, user }) => {
  const [imageFile, setImageFile] = useState();
  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [phone, setPhone] = useState(user.phone || "");
  const [password, setPassword] = useState(user.password || "");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [genre, setGenre] = useState(user.genre || "");
  const [levelEnglish, setLevelEnglish] = useState(user.levelEnglish || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [error, setError] = useState("");
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState(user.studentAvatar);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== repeatPassword) {
      setPasswordError(true);
      return;
    }

    const formData = new FormData();
    formData.append("firstName", firstName);
    formData.append("lastName", lastName);
    formData.append("phone", phone);
    formData.append("password", password);
    formData.append("genre", genre);
    formData.append("levelEnglish", levelEnglish);
    formData.append("file", avatarFile);
    console.log("====================================");
    console.log("formdata", formData);
    console.log("====================================");
    onSubmit(formData);

    onClose();
  };

  const handleAvatarChange = (event) => {
    setAvatarFile(event.target.files[0]);
    const file = event.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Update Information</DialogTitle>
      <DialogContent>
        <DialogContentText>Enter your new information:</DialogContentText>
        <div className="avatar-preview">
          {avatarPreviewUrl && (
            <Avatar
              alt="Avatar Preview"
              src={avatarPreviewUrl}
              sx={{ width: 100, height: 100 }}
            />
          )}
        </div>
        <Button
          variant="contained"
          component="label"
          startIcon={<AddPhotoAlternateIcon />}
          sx={{ marginTop: "10px", marginBottom: "10px" }}
        >
          Add Your Avatar
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleAvatarChange}
          />
        </Button>
        <form onSubmit={handleSubmit}>
          <StyledTextField
            autoFocus
            margin="dense"
            id="firstName"
            label="First Name"
            type="text"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <StyledTextField
            margin="dense"
            id="lastName"
            label="Last Name"
            type="text"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <StyledTextField
            margin="dense"
            id="phone"
            label="Phone"
            type="tel"
            fullWidth
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <StyledTextField
            margin="dense"
            id="password"
            label="New Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <StyledTextField
            margin="dense"
            id="repeatPassword"
            label="Confirm Password"
            type="password"
            fullWidth
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          {passwordError && (
            <FormHelperText error>Passwords do not match</FormHelperText>
          )}
          <FormControl fullWidth margin="dense">
            <InputLabel id="genre-select-label">Genre</InputLabel>
            <Select
              labelId="genre-select-label"
              id="genre"
              label="Genre"
              defaultValue={"Homme"}
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            >
              <MenuItem value="Homme">Male</MenuItem>
              <MenuItem value="Femme">Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <InputLabel id="levelEnglish-select-label">
              Level English
            </InputLabel>
            <Select
              labelId="levelEnglish-select-label"
              id="levelEnglish"
              label="Level English"
              defaultValue={"A1"}
              value={levelEnglish}
              onChange={(e) => setLevelEnglish(e.target.value)}
            >
              {/* "A1", "A2", "B1", "B2", "C1", "C2" */}
              <MenuItem value="A1">A1</MenuItem>
              <MenuItem value="A2">A2</MenuItem>
              <MenuItem value="B1">B1</MenuItem>
              <MenuItem value="B2">B2</MenuItem>
              <MenuItem value="C1">C1</MenuItem>
              <MenuItem value="C2">C2</MenuItem>
            </Select>
          </FormControl>
          {errorMessage && (
            <FormHelperText error>Passwords do not match</FormHelperText>
          )}
          <StyledButton type="submit" variant="contained">
            Update
          </StyledButton>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateInformationForm;
