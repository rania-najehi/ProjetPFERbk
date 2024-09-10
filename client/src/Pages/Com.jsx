import React, { useState } from "react";
import { Grid, TextField, Pagination, Box } from "@mui/material";
import UserCard from "../Components/community/cards.jsx";
const usersData = [
  {
    id: 1,
    name: "John Doe",
    job: "Software Engineer",
    role: "Admin",
    about:
      "Experienced developer with a passion for creating innovative solutions.",
    avatar: "https://i.pravatar.cc/300",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  {
    id: 1,
    name: "John Doe",
    job: "Software Engineer",
    role: "Admin",
    about:
      "Experienced developer with a passion for creating innovative solutions.",
    avatar: "https://i.pravatar.cc/300",
    github: "https://github.com/johndoe",
    linkedin: "https://linkedin.com/in/johndoe",
  },
  {
    id: 2,
    name: "Jane Smith",
    job: "Product Designer",
    role: "Student",
    about:
      "Creative designer with an eye for detail and a love for user experience.",
    avatar: "https://i.pravatar.cc/301",
    github: "https://github.com/janesmith",
    linkedin: "https://linkedin.com/in/janesmith",
  },
  // More users...
];

const Community = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const filteredUsers = usersData.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box
      sx={{
        p: 4,
        width: "100%",
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
      <Grid container spacing={3}>
        {usersData.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <UserCard user={user} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Pagination
          count={Math.ceil(usersData.length / 4)}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </Box>
  );
};

export default Community;
