import React, { useState } from 'react';
import {
  Modal,
  Fade,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const AddEventModal = ({ isOpen, onClose, fetchEvents }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const eventData = new FormData();
    eventData.append('title', formData.title);
    eventData.append('description', formData.description);
    eventData.append('image', formData.image); // Correctly append the image file

    try {
      const response = await axios.post(
        'http://localhost:4000/api/v1/event/events',
        eventData
      );
      toast.success('Event added successfully');
      fetchEvents();
      onClose();
      setFormData({ title: '', description: '', image: null });
    } catch (error) {
      console.log(error);
      toast.error('Failed to add event');
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      closeAfterTransition
    >
      <Fade in={isOpen}>
        <div
          style={{
            backgroundColor: '#fff',
            boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            outline: 'none',
            maxWidth: 400,
            width: '100%',
            borderRadius: 8,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Event
          </Typography>
          <form
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
            onSubmit={handleFormSubmit}
          >
            <TextField
              type="text"
              name="title"
              value={formData.title}
              label="Title"
              variant="outlined"
              onChange={handleInputChange}
              required
            />
            <TextField
              name="description"
              value={formData.description}
              label="Description"
              variant="outlined"
              onChange={handleInputChange}
              multiline
              rows={4}
              required
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              required
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Event
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default AddEventModal;
