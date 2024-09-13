import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const AddEventModal = ({ show, onHide, onAddEvent }) => {
  const [formData, setFormData] = useState({
    // ... vos champs de formulaire
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:4000/api/v1/event/events', formData);
      onAddEvent();
      setFormData({
        // Réinitialiser le formulaire
      });
    } catch (error) {
      // Gérer les erreurs
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un événement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* ... vos champs de formulaire ... */}
          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddEventModal;