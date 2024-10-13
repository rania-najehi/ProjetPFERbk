import React, { useState } from "react";
import { Card, Button, Carousel } from "react-bootstrap";
import { Trash, Pencil, ChevronUp, ChevronDown } from "react-bootstrap-icons";
import "./eventCardList.css";
import imagePlaceholder from "../../assets/image.png";
import moment from "moment";
const EventCard = ({ event, onDelete, onUpdate, handleNavigate }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setIsDetailsVisible((prev) => !prev);
  };

  // Shorten the description if necessary
  const getShortDescription = (description) => {
    if (!description) return "Description not available";
    return description.length > 55
      ? description.substring(0, 55) + "..."
      : description;
  };

  return (
    <Card key={event._id} className="event-card mb-4">
      <Card.Body className="event-card-body">
        {/* Title */}
        <Card.Title
          className="event-card-title"
          style={{ color: "red", fontSize: "1.5rem", fontStyle: "italic" }}
        >
          {event.title || "No title available"}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {moment(event.date).format("MMM Do YY")}
        </Card.Subtitle>

        {/* Image Carousel */}
        <div
          onClick={() => handleNavigate(event._id)}
          className="card-img-container"
        >
          {event.images.length > 0 ? (
            <Carousel>
              {event.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 event-card-img"
                    src={`http://localhost:4000/uploads/${image}`}
                    alt={`Image ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Card.Img
              variant="top"
              src={imagePlaceholder}
              alt="Placeholder"
              className="event-card-img"
            />
          )}
        </div>

        {/* Description */}
        <Card.Text className="mt-3">
          <div>
            <strong>Description:</strong>{" "}
            {isDetailsVisible || event.description.length <= 50
              ? event.description
              : getShortDescription(event.description)}
          </div>
        </Card.Text>

        {/* Details Button Always at the Bottom */}
        <Card.Text>
          <div className="details-button-wrapper">
            <span
              onClick={toggleDetails}
              className="details-button"
              style={{ cursor: "pointer" }}
            >
              {isDetailsVisible ? <ChevronUp /> : <ChevronDown />}
            </span>
          </div>
        </Card.Text>
      </Card.Body>

      {/* Edit and Delete Buttons */}
      <div className="card-buttons">
        <Button
          variant="outline-primary"
          className="mr-2"
          onClick={() => onUpdate(event)}
        >
          <Pencil />
        </Button>
        <Button variant="outline-danger" onClick={() => onDelete(event._id)}>
          <Trash />
        </Button>
      </div>
    </Card>
  );
};

const EventCardList = ({ events, onDelete, onUpdate, handleNavigate }) => {
  return (
    <div className="event-card-list">
      {events.map((event) => (
        <EventCard
          key={event._id}
          event={event}
          onDelete={onDelete}
          onUpdate={onUpdate}
          handleNavigate={handleNavigate}
        />
      ))}
    </div>
  );
};

export default EventCardList;
