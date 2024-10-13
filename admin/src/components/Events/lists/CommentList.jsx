import React, { useEffect, useState } from "react";
import { Card, CardImg, CardBody, CardTitle, CardText } from "react-bootstrap";
import { Pagination } from "@mui/material";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router-dom";
import "./CommentList.css"; // Import the CSS file
const CommentList = () => {
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { eventId } = useParams();
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `http://127.0.0.1:4000/api/v1/comment/allComments/${eventId}/${page}/3`
        ); // Adjust the URL as needed
        setComments(response.data.comments);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [eventId, page]);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  return (
    <div className="container d-flex flex-column gap-1 align-items-center">
      <div className="row">
        {comments.map((comment) => (
          <div className="col-md-4" key={comment._id}>
            <Card className="mb-4 card-fixed-size">
              {comment.media && (
                <CardImg
                  className="card-img-top"
                  top
                  src={comment.media}
                  alt="Card image cap"
                />
              )}
              <CardBody>
                <CardTitle tag="h5">{comment.sender.firstName}</CardTitle>
                <CardText>{comment.message}</CardText>
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

export default CommentList;
