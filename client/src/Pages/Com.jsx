import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../main.jsx";
import { Grid, TextField, Pagination, Box, Typography } from "@mui/material";
import UserCard from "../Components/community/cards.jsx";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const { token } = useContext(Context);
  const [commonConn, setConn] = useState([]);
  const [commonNoConn, setNoConn] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const usersPerPage = 3;
  useEffect(() => {
    usersCommonRooms();
    usersWithoutCommonRooms();
  }, []);
  const filteredUsers = commonConn.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );
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
        "http://127.0.0.1:4000/api/v1/chat/norelated/0/0",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNoConn(data.data);
      setLoading(false);
      console.log(data.data);
    } catch (error) {
      throw error;
    }
  };
  const usersCommonRooms = async () => {
    try {
      const data = await axios.get(
        "http://127.0.0.1:4000/api/v1/chat/connection/0/0",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setConn(data.data);
      setLoading(false);

      console.log("connection", data.data);
    } catch (error) {
      throw error;
    }
  };
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
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
        fullWidth
        sx={{ marginBottom: 3, width: "30%" }}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Typography variant="h3" component="h5">
        Your Connections
      </Typography>
      <Grid container spacing={3}>
        {commonConn.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard
              createRoom={createRoom}
              navigateContactToChat={navigateContactToChat}
              user={user}
              connect={true}
              key={user._id}
            />
          </Grid>
        ))}
      </Grid>
      <Typography variant="h3" component="h5">
        Community to connect
      </Typography>
      <Grid container spacing={3}>
        {commonNoConn.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard
              createRoom={createRoom}
              navigateContactToChat={navigateContactToChat}
              user={user}
              connect={false}
              key={user._id}
            />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Pagination
          count={Math.ceil(commonConn.length / usersPerPage)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Community;
