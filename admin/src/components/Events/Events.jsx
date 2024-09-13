// Events.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCardList from './EventCardList.jsx';
import EventModal from './EventModal.jsx';
import { Button } from 'react-bootstrap';
import "./events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4000/api/v1/event/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des événements', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setSelectedEvent(null); // Reset the selected event when closing
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/api/v1/event/events/${eventId}`);
      fetchEvents(); // Refresh the list of events after deletion
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement', error);
    }
  };

  const handleUpdate = async (updatedEvent) => {
    try {
      await axios.put(`http://127.0.0.1:4000/api/v1/event/events/${updatedEvent._id}`, updatedEvent);
      fetchEvents(); // Refresh the list of events after update
      handleClose(); // Close the modal after updating
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'événement', error);
    }
  };

  return (
    <>
      <div className="add-event-btn">
        <Button variant="primary" onClick={handleShow}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-calendar-event"
            viewBox="0 0 16 16"
          >
            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z" />
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
          </svg>
        </Button>
      </div>
      <EventCardList events={events} onDelete={handleDelete} onUpdate={(event) => {
        setSelectedEvent(event);
        handleShow();
      }} />
      <EventModal
        show={showModal}
        handleClose={handleClose}
        fetchEvents={fetchEvents}
        event={selectedEvent}
        handleUpdate={handleUpdate}
      />
    </>
  );
};

export default Events;
