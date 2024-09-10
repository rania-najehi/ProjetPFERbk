import React, { useState, useEffect } from 'react';
import {
  Modal,
  Fade,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditEventModal = ({ isOpen, onClose, event, setTrigger,trigger }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
  });
console.log(formData,"formData");
  useEffect(() => {
    if (event) {
      setFormData({
        title: event.title,
        description: event.description,
        image: event.image,
      });
    }
  }, [event]);

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
    if (formData.image instanceof File) {
      eventData.append('image', formData.image);
    }

    try {
        console.log(eventData,"eventData");
   await axios.put(
        `http://localhost:4000/api/v1/event/events/${event._id}`,
        eventData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      ).then((resp)=>console.log(resp)).then(()=>setTrigger(!trigger))
    .catch((err)=>console.log(err));
    toast.success('Event updated successfully');

      onClose();
    } catch (error) {
      console.log(error);
      toast.error('Failed to update event');
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
            Edit Event
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
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button onClick={onClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Update Event
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default EditEventModal;
