// EventSidebar.jsx
import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import moment from "moment";
import EventMap from "./EventMap"; // Import the EventMap component
import {
  Twitter,
  Facebook,
  PersonPlus,
  HandThumbsUp,
} from "react-bootstrap-icons";

const EventSidebar = ({ eventData }) => {
  return (
    <div className="sidebar-container">
      <Card className="event-card">
        <Card.Body>
          <Card.Title>{eventData.title}</Card.Title>
          <Card.Text>
            <p>
              <strong>Date & Time:</strong>{" "}
              {moment(eventData.date).format("MMM Do YY")}
            </p>
            <p>
              <strong>Category:</strong> {eventData.category}
            </p>
            <p>
              <strong>Location:</strong> {eventData.location.address}
            </p>
            <EventMap location={eventData.location} />{" "}
            {/* Add the map component */}
            <p>
              <strong>Contact:</strong> {eventData.contact}
            </p>
            <p>
              <strong>Social:</strong>
              <a
                href={eventData.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter />
              </a>
              <a
                href={eventData.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook />
              </a>
            </p>
            <p>
              <strong>Engagement:</strong>
              <Badge bg="secondary">
                <PersonPlus /> {eventData.ups.length}
              </Badge>
              <Badge bg="primary">
                <HandThumbsUp /> {eventData.likes.length}
              </Badge>
            </p>
          </Card.Text>
          <Button variant="outline-primary" size="sm">
            Edit Event
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default EventSidebar;
