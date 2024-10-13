import React, { useEffect, useState } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import { Pagination } from "@mui/material";

const LikedList = () => {
  const { eventId } = useParams();
  console.log("eventId", eventId);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/v1/comment/allLiked/${eventId}/${page}/3`
        ); // Adjust the URL as needed
        console.log("likes", response.data);
        setUsers(response.data.likes);
      } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
      }
    };

    fetchUsers();
  }, [eventId, page]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <div className="container d-flex flex-column gap-1 align-items-center">
      <div className="row">
        {users.map((user) => (
          <div className="col-md-4" key={user._id}>
            <Card className="mb-4 card-fixed-size">
              <CardImg
                className="card-img-top"
                src={`http://localhost:4000/uploads/${user.studentAvatar}`}
                alt="User avatar"
              />
              <CardBody>
                <CardTitle tag="h5">{`${user.firstName} ${user.lastName}`}</CardTitle>
                <CardText>{user.email}</CardText>
                <CardText>{user.phone}</CardText>
                <CardText>{user.genre}</CardText>
                <CardText>{user.levelEnglish}</CardText>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handlePageChange}
        variant="outlined"
        shape="rounded"
        className="pagination"
      />
    </div>
  );
};

export default LikedList;
