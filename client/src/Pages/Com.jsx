import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../main.jsx";
import { Grid, TextField, Pagination, Box, Typography } from "@mui/material";
import UserCard from "../Components/community/cards.jsx";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const Community = () => {
  const { token } = useContext(Context);
  const [commonConn, setConn] = useState([]);
  const [commonNoConn, setNoConn] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPageconn, setCurrentPageconn] = useState(1);
  const [totalPagesconn, setTotalPagesconn] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    usersWithoutCommonRooms();
  }, [currentPage]);
  useEffect(() => {
    usersCommonRooms();
  }, [currentPageconn]);

  const createRoom = async (userId) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/chat/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data chat", data);

      navigate("/dashboard/chat");
    } catch (error) {
      throw error;
    }
  };
  const navigateContactToChat = () => {
    navigate("/dashboard/chat");
  };
  const usersWithoutCommonRooms = async () => {
    try {
      const data = await axios.get(
        `http://127.0.0.1:4000/api/v1/chat/norelated/${currentPage}/3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("response.data.totalPages", response.data.totalPages);
      console.log("data.data.currentPage", data.data.currentPage);
      console.log("data.data.totalPages", data.data.totalPages);
      setNoConn(data.data.usersWithoutCommonRooms);
      setCurrentPage(data.data.currentPage);
      setTotalPages(data.data.totalPages);
      setLoading(false);

      console.log(data.data);
    } catch (error) {
      throw error;
    }
  };
  const usersCommonRooms = async () => {
    try {
      const data = await axios.get(
        `http://127.0.0.1:4000/api/v1/chat/connection/${currentPageconn}/3`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCurrentPageconn(data.data.currentPage);
      setTotalPagesconn(data.data.totalPages);
      setConn(data.data.usersWithCommonRooms);
      setLoading(false);

      console.log("connection", data.data);
    } catch (error) {
      throw error;
    }
  };

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };
  const handleChangePageconn = (event, value) => {
    setCurrentPageconn(value);
  };

  if (loading) {
    return <div className="loader2"></div>;
  }
  return (
    <Box
      sx={{
        p: 4,
        width: "100%",
        gap: 4,
        display: "flex",
        // alignItems: "center",
        flexDirection: "column",
      }}
    >
      <TextField
        label="Search Users"
        variant="outlined"
        // sx={{ marginBottom: 3, width: "30%" }}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{
          marginBottom: 3,
          width: "30%",
          "& .MuiInputLabel-root": { color: "gray" },
          "& .MuiInputLabel-root.Mui-focused": { color: "#ff007b" },
        }}
      />
      <Typography variant="h3" component="h5">
        Your Connections
      </Typography>
      <Grid container spacing={3}>
        {commonConn.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <UserCard
              createRoom={createRoom}
              navigateContactToChat={navigateContactToChat}
              user={user}
              connect={true}
              key={user.email}
            />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 4,
        }}
      >
        <Pagination
          count={totalPagesconn}
          page={currentPageconn}
          onChange={handleChangePageconn}
          color="primary"
        />
      </Box>
      <Typography variant="h3" component="h5">
        Community to connect
      </Typography>
      <Grid container spacing={3}>
        {commonNoConn.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user._id}>
            <UserCard
              createRoom={createRoom}
              navigateContactToChat={navigateContactToChat}
              user={user}
              connect={false}
              // key={user.email}
            />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Pagination
          // sx={{
          //   boxShadow: 3,
          //   transition: "transform 0.3s ease",
          //   "&:hover": { transform: "scale(1.05)" },
          // }}
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
          showFirstButton // Show first page button
          showLastButton // Show last page button
        />
      </Box>
    </Box>
  );
};

export default Community;
