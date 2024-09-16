import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EventModal = ({ show, handleClose, fetchEvents, event }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    category: '',
    eventOrganizer: '',
    notes: '',
    images: [], // Pour les nouvelles images à télécharger
  });

  useEffect(() => {
    if (event) {
      // Mode édition : pré-remplir les champs avec les données de l'événement
      const isValidDate = (dateString) => {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      };

      setFormData({
        title: event.title || '',
        description: event.description || '',
        date: event.date && isValidDate(event.date) ? new Date(event.date).toISOString().split('T')[0] : '',
        startTime: event.startTime && isValidDate(event.startTime) ? new Date(event.startTime).toISOString().split('T')[1].substring(0, 5) : '',
        endTime: event.endTime && isValidDate(event.endTime) ? new Date(event.endTime).toISOString().split('T')[1].substring(0, 5) : '',
        category: event.category || '',
        eventOrganizer: event.eventOrganizer || '',
        notes: event.notes || '',
        images: [], // Réinitialiser les images lors de l'ouverture du modal
      });
    } else {
      // Mode ajout : réinitialiser les champs
      setFormData({
        title: '',
        description: '',
        date: '',
        startTime: '',
        endTime: '',
        category: '',
        eventOrganizer: '',
        notes: '',
        images: [],
      });
    }
  }, [event, show]); // Ajoutez show pour réinitialiser les champs lorsque le modal est affiché

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files, // Stocker les fichiers sélectionnés
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        for (let i = 0; i < formData.images.length; i++) {
          formDataToSend.append('images', formData.images[i]);
        }
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      if (event) {
        await axios.put(`http://127.0.0.1:4000/api/v1/event/events/${event._id}`, formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post('http://127.0.0.1:4000/api/v1/event/events', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      fetchEvents();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire', error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{event ? 'Modifier l\'événement' : 'Ajouter un événement'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formTitle">
            <Form.Label>Titre</Form.Label>
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
              rows={3}
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
          <Form.Group controlId="formCategory">
            <Form.Label>Catégorie</Form.Label>
            <Form.Control
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formOrganizer">
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
              rows={3}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="formImages">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
            />
            {event && event.images.length > 0 && (
              <div className="image-preview">
                {event.images.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:4000${image}`}
                    alt={`Image ${index + 1}`}
                    style={{ width: '100px', margin: '5px' }}
                  />
                ))}
              </div>
            )}
          </Form.Group>
          <Button variant="primary" type="submit">
            {event ? 'Mettre à jour' : 'Ajouter'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EventModal;
