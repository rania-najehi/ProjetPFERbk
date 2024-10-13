import React, { useState, useEffect, useRef, useContext } from "react";
import {
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Box,
  IconButton,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  FormHelperText,
  FormControl,
  Select,
  MenuItem,
  styled,
  InputAdornment,
  Input,
  InputLabel,
} from "@mui/material";
import Flickity from "react-flickity-component"; // Import Flickity
import "flickity/dist/flickity.min.css"; // Import Flickity CSS
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Context } from "../../main.jsx";
import { Carousel } from "react-responsive-carousel";
import "react-horizontal-scrolling-menu/dist/styles.css"; // Import styles
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

import moment from "moment";
import axios from "axios";
import { useParams, useLocation } from "react-router-dom";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#ff007b",
  color: "white",
  border: "2px solid #ff007b",
  "&:hover": {
    backgroundColor: "#c20052",
  },
}));

// Style Input and Label on Focus
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "gray",
      transition: "border-color 0.3s ease-in-out",
    },
    "&:hover fieldset": {
      borderColor: "#ff007b",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ff007b",
    },
  },
  "& .MuiFormLabel-root": {
    color: "gray",
    "&.Mui-focused": {
      color: "#ff007b",
    },
  },
}));
// ... (Your styled components) ...

const EventDetails = () => {
  const { token, setToken } = useContext(Context);

  const { eventId } = useParams();
  const location = useLocation();
  const { event, user } = location.state;

  console.log("user", user);
  const [comments, setComments] = useState(event?.comments || []); // Set initial state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [commentFile, setCommentFile] = useState(null);
  const [commentPreviewUrl, setCommentPreviewUrl] = useState(null);

  const [liked, setLiked] = useState(user?.likes?.includes(event._id));
  const [subscribed, setSubscribed] = useState(user?.ups?.includes(event._id));
  const fileInputRef = useRef(null);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCommentFile(file);
      setCommentPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleAddComment = async (id) => {
    const formData = new FormData();
    formData.append("message", newComment);
    formData.append("event", id);
    formData.append("sender", "userId"); // Replace with the actual user ID
    if (commentFile) {
      formData.append("file", commentFile);
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/comment/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("comment", response);

      setComments([response.data, ...comments]);
      setNewComment("");
      setCommentFile(null);
      setCommentPreviewUrl(null);
    } catch (error) {
      console.error("Error adding comment:", error);
      setError("Failed to add comment.");
    }
  };

  const handleLike = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/comment/likes/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data like", response);
      console.log(response.data.likes.includes(user._id));
      setLiked(response.data.likes.includes(user._id));
    } catch (error) {
      console.error("Error updating likes:", error);
      setError("Failed to update likes.");
    }
  };

  const handleSubscribe = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:4000/api/v1/comment/ups/${id}`,
        //  Pass headers as an option to axios.put
        {}, // You can add more headers here if needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update UI based on whether user is subscribed or not
      setSubscribed(response.data.ups.includes(user._id));
    } catch (error) {
      console.error("Error updating ups:", error);
      setError("Failed to update ups.");
    }
  };

  return (
    <div className="container" style={{ backgroundColor: "white" }}>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Card className="card_dash">
                <CardContent className="card-content_dash">
                  <Typography variant="h4" color={"black"}>
                    {event.title}
                  </Typography>
                  <Typography variant="h6">
                    {"From" +
                      " " +
                      event.startTime +
                      " " +
                      "to" +
                      " " +
                      event.endTime}
                  </Typography>
                  <Typography variant="h6">
                    <i className="bi bi-calendar-event icon_dash"></i>{" "}
                    {moment(event.date).format("MMM Do YY")}
                  </Typography>
                  <Typography variant="body2">{event.description}</Typography>
                  <Typography variant="body2">
                    {event.location.address}
                  </Typography>
                  {/* ... Display Likes and Subscribe Buttons ... */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    <Button
                      variant={liked ? "contained" : "outlined"}
                      color="secondary"
                      onClick={() => handleLike(event._id)}
                      startIcon={
                        liked ? <ThumbUpAltIcon /> : <ThumbUpAltOutlinedIcon />
                      }
                    >
                      {liked ? "Liked" : "Like"}
                    </Button>
                    <Button
                      variant={subscribed ? "contained" : "outlined"}
                      color="secondary"
                      onClick={() => handleSubscribe(event._id)}
                      startIcon={
                        subscribed ? (
                          <ThumbUpAltIcon />
                        ) : (
                          <ThumbUpAltOutlinedIcon />
                        )
                      }
                    >
                      {subscribed ? "Subscribed" : "Subscribe"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* ... Show Comments ... */}
              <Box marginTop={3}>
                <Flickity
                  // className="carousel"
                  options={{
                    cellAlign: "left",
                    groupCells: "10%",
                    // contain: true, // Prevents Flickity from overflowing
                    prevNextButtons: true, // Show navigation buttons
                    pageDots: false, // Optional: Show page dots
                  }}
                >
                  {comments.map((comment) => (
                    <div key={comment._id}>
                      <Card style={{ padding: "10px", margin: "0 10px" }}>
                        <Box
                          display={"flex"}
                          flexDirection={"column"}
                          sx={{
                            minHeight: "200px",
                            maxHeight: "200px",
                            minWidth: "300px",
                            maxWidth: "300px",
                          }}
                          gap={0.5}
                        >
                          <Box display={"flex"} marginBottom={2}>
                            <Avatar
                              alt={comment.sender.firstName}
                              src={comment.sender.studentAvatar}
                              sx={{
                                width: 30,
                                height: 30,
                              }}
                            />
                            <Typography variant="body2">
                              {comment.sender.firstName}{" "}
                              {comment.sender.lastName}
                            </Typography>
                          </Box>
                          {comment.media && (
                            <img
                              src={`http://localhost:4000/uploads/${comment.media}`}
                              alt="Comment Media"
                              style={{
                                Width: "inherit",
                                maxHeight: "inherit",
                              }}
                            />
                          )}
                          <Typography variant="body2">
                            {comment.message}
                          </Typography>
                        </Box>
                      </Card>
                    </div>
                  ))}
                </Flickity>
              </Box>
              {/* ... Add Comment Form ... */}
              <Box marginTop={2}>
                <div className="comment-preview">
                  {commentPreviewUrl && (
                    <img
                      src={commentPreviewUrl}
                      alt="Comment Media"
                      style={{ maxWidth: "200px", maxHeight: "150px" }}
                    />
                  )}
                </div>
                <Box display={"flex"} gap={1} height={"10%"} width="100%">
                  <StyledTextField
                    fullWidth
                    label="Comment"
                    value={newComment}
                    onChange={handleCommentChange}
                    // margin="normal"
                  />
                  <StyledButton
                    variant="contained"
                    component="label"
                    fontSize={1}
                    padding={1}
                    startIcon={<AddPhotoAlternateIcon />}
                  >
                    <input
                      hidden
                      accept="image/*"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleCommentFileChange}
                    />
                  </StyledButton>
                  <StyledButton
                    variant="contained"
                    onClick={() => handleAddComment(event._id)}
                  >
                    Post
                  </StyledButton>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={5} sm={6}>
              <Card>
                <CardContent>
                  <div>
                    <Carousel
                      showThumbs={false}
                      showStatus={false}
                      infiniteLoop={true}
                    >
                      {event.images.map((photo) => (
                        <div key={photo}>
                          <img src={photo} alt={event.title} />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
};

// ... (Your styled components) ...

export default EventDetails;
