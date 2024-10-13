// EventContent.jsx
import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./EventContent.css"; // Import the CSS file for styling

const EventContent = ({ eventData }) => {
  return (
    <div className="content full-screen">
      <div className="header">
        <h1>{eventData.title}</h1>
        <p>{eventData.description}</p>
        <p>{new Date(eventData.date).toLocaleDateString()}</p>
      </div>
      <Carousel className="w-100">
        {eventData.images.map((image, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={`http://127.0.0.1:4000/uploads/${image}`}
              alt={`Event Image ${index}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default EventContent;
