import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventCardList from './EventCardList.jsx';
import EventModal from './EventModal.jsx';
import { Button, Form } from 'react-bootstrap';
import "./events.css";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]); // État pour les événements filtrés
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4000/api/v1/event/events');
      setEvents(response.data);
      setFilteredEvents(response.data); // Initialise les événements filtrés
    } catch (error) {
      console.error('Erreur lors de la récupération des événements', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Filtrer les événements en fonction du terme de recherche
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    
    const filtered = events.filter(event =>
      event.title.toLowerCase().includes(value) || // Vérifie si le titre contient le terme de recherche
      event.category.toLowerCase().includes(value) // Vérifie si la description contient le terme de recherche
    );
    setFilteredEvents(filtered); // Met à jour la liste des événements affichés
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // Pas besoin d'une soumission spéciale puisque le filtrage est déjà fait dans handleSearchChange
  };

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setSelectedEvent(null);
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/api/v1/event/events/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'événement', error);
    }
  };

  const handleUpdate = async (updatedEvent) => {
    try {
      await axios.put(`http://127.0.0.1:4000/api/v1/event/events/${updatedEvent._id}`, updatedEvent);
      fetchEvents();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'événement', error);
    }
  };

  return (
    <>
      <div className="event-controls">
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
        <Form onSubmit={handleSearchSubmit} className="search-form">
          <Form.Control
            type="text"
            placeholder="Catégorie"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <Button variant="outline-primary" type="submit">
            Rechercher
          </Button>
        </Form>
      </div>

      {/* Utilise filteredEvents au lieu de events */}
      <EventCardList
        events={filteredEvents}
        onDelete={handleDelete}
        onUpdate={(event) => {
          setSelectedEvent(event);
          handleShow();
        }}
      />
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
