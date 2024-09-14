import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EventUpdateModal = ({ show, handleClose, event, handleUpdate }) => {
  const [formData, setFormData] = useState(event);

  useEffect(() => {
    setFormData(event);
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        [name]: value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:4000/api/v1/event/events/${formData._id}`, formData);
      handleUpdate(formData);
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'événement :', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Mettre à jour l'événement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Form fields for editing */}
          <Button variant="primary" type="submit">Mettre à jour</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EventUpdateModal;
