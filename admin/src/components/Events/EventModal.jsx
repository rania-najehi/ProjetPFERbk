import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EventModal = ({ show, handleClose, fetchEvents }) => {
  const initialFormData = {
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    location: {
      address: '',
      latitude: '',
      longitude: ''
    },
    images: [],
    eventOrganizer: '',
    notes: '',
    category: ''
  };

  const [formData, setFormData] = useState(initialFormData);
  const [error, setError] = useState('');

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

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    // Validate file types
    for (let i = 0; i < files.length; i++) {
      if (!validImageTypes.includes(files[i].type)) {
        setError("Seules les images au format JPEG, PNG ou GIF sont acceptées.");
        return;
      }
    }

    setFormData({
      ...formData,
      images: files,
    });
    setError(''); // Clear any previous errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Preparing FormData to send
    const eventFormData = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'location') {
        Object.keys(formData[key]).forEach((subKey) => {
          eventFormData.append(`location.${subKey}`, formData[key][subKey]);
        });
      } else if (key === 'images') {
        formData[key].forEach((file) => {
          eventFormData.append('images', file);
        });
      } else {
        eventFormData.append(key, formData[key]);
      }
    });

    try {
      await axios.post('http://127.0.0.1:4000/api/v1/event/events', eventFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear form fields after successful submission
      setFormData(initialFormData);
      handleClose();
      fetchEvents(); // Refresh the events list
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'événement :', error);
      setError("Une erreur s'est produite lors de l'ajout de l'événement. Veuillez réessayer.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Ajouter un évènement</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Titre de l'évènement</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formDate">
            <Form.Label>Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formStartTime">
            <Form.Label>Heure de début</Form.Label>
            <Form.Control
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formEndTime">
            <Form.Label>Heure de fin</Form.Label>
            <Form.Control
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formLocationAddress">
            <Form.Label>Adresse</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={formData.location.address}
              onChange={handleLocationChange}
            />
          </Form.Group>

          <Form.Group controlId="formLocationLatitude">
            <Form.Label>Latitude</Form.Label>
            <Form.Control
              type="number"
              name="latitude"
              value={formData.location.latitude}
              onChange={handleLocationChange}
            />
          </Form.Group>

          <Form.Group controlId="formLocationLongitude">
            <Form.Label>Longitude</Form.Label>
            <Form.Control
              type="number"
              name="longitude"
              value={formData.location.longitude}
              onChange={handleLocationChange}
            />
          </Form.Group>

          <Form.Group controlId="formImages">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              name="images"
              multiple
              onChange={handleImagesChange}
            />
          </Form.Group>

          <Form.Group controlId="formEventOrganizer">
            <Form.Label>Organisateur</Form.Label>
            <Form.Control
              type="text"
              name="eventOrganizer"
              value={formData.eventOrganizer}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formNotes">
            <Form.Label>Notes</Form.Label>
            <Form.Control
              as="textarea"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formCategory">
            <Form.Label>Catégorie</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Ajouter
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EventModal;
