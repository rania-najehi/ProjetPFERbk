// EventNavigationBar.jsx
import React from "react";
import { Navbar, Nav } from "react-bootstrap";

const EventNavigationBar = ({ eventId }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href={`/events/${eventId}`}>Event Management</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href={`/events/${eventId}/comments`}>Comment List</Nav.Link>
          <Nav.Link href={`/events/${eventId}/subscribers`}>
            Subscribers List
          </Nav.Link>
          <Nav.Link href={`/events/${eventId}/likes`}>Likes List</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
export default EventNavigationBar;
