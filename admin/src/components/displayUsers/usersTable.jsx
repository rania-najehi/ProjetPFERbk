import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import axios from "axios";
import { Context } from "../../main";
import { toast } from "react-toastify";
// import { User } from "./models/User"; // Assuming you have your User model
import { useNavigate } from "react-router-dom";
function AdminUsersTable() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const { token } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const handleChangePage = (event, value) => {
    setCurrentPage(value);
  };

  const fetchStudents = async () => {
    setLoading(true);
    try {
      console.log("Fetching students...");
      const { data } = await axios.get(
        `http://127.0.0.1:4000/api/v1/user/student/getStudent/${currentPage}/5`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Data fetched:", data);
      setUsers(data.student);
      setCurrentPage(data.currentPage);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching students:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    fetchStudents();
  }, [currentPage]);

  if (!token) {
    navigate("/login");
    // You'll need to import Navigate from 'react-router-dom' for this to work
  }
  const createRoom = async (userId) => {
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/chat/admin/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("data chat", data);

      navigate("/messages");
    } catch (error) {
      if (error.response.data.error === "Room  exists") {
        navigate("/messages");
      } else {
        throw error;
      }
    }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      const { data } = await axios.put(
        `http://127.0.0.1:4000/api/v1/user/student/update-status/${userId}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // After update, fetch the updated data
      fetchStudents();
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const filteredUsers = users.filter((user) => {
    const nameMatch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch =
      selectedStatus === "All" || user.status === selectedStatus;
    return nameMatch && statusMatch;
  });
  if (loading) {
    return <div className="loader2"></div>;
  }
  return (
    <div style={{ padding: "1rem" }}>
      <h2>All Users</h2>
      <div style={{ display: "flex", marginBottom: "1rem" }}>
        <TextField
          label="Search by Name"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ marginRight: "1rem" }}
        />
        <Select
          label="Status"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <MenuItem value="All">All</MenuItem>
          <MenuItem value="Pending">Pending</MenuItem>
          <MenuItem value="Accepted">Accepted</MenuItem>
          <MenuItem value="Rejected">Rejected</MenuItem>
        </Select>
      </div>
      <Box
        display={"flex"}
        gap={2}
        alignItems="center"
        flexDirection={"column"}
        justifyContent="center"
      >
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Gender</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update Status</TableCell>
                <TableCell>Contact</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user._id}>
                  <TableCell>{user._id}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell></TableCell>
                  <TableCell
                    style={{
                      color:
                        user.status === "Pending"
                          ? "orange"
                          : user.status === "Rejected"
                          ? "red"
                          : "green",
                    }}
                  >
                    {user.status}
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={user.status}
                      onChange={(event) =>
                        handleStatusUpdate(user._id, event.target.value)
                      }
                    >
                      <MenuItem value="Pending">Pending</MenuItem>
                      <MenuItem value="Accepted">Accepted</MenuItem>
                      <MenuItem value="Rejected">Rejected</MenuItem>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => createRoom(user._id)}
                      sx={{
                        color: "#ff007b",
                        bgcolor: "white",
                        "&:hover": {
                          bgcolor: "#ff007b", // Background color on hover
                          color: "white",
                        },
                      }}
                    >
                      contact
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          // sx={{
          //   boxShadow: 3,
          //   transition: "transform 0.3s ease",
          //   "&:hover": { transform: "scale(1.05)" },
          // }}
          count={totalPages}
          page={currentPage}
          onChange={handleChangePage}
          sx={{
            color: "#ff007b",
          }}
        />
      </Box>
    </div>
  );
}

export default AdminUsersTable;
