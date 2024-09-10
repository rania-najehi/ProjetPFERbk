import React, { useState } from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';
import { FaEdit } from 'react-icons/fa';
import EditEventModal from './EditModal.jsx';

const EventCard = ({ event, onDelete, fetchEvents,setTrigger,trigger }) => {
  const [isEditModalOpen, setEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
  };

  return (
    <Card sx={{ width: 500, minHeight: 300, margin: 'auto', marginBottom: 4, position: 'relative' }}>
      <CardContent sx={{ paddingBottom: 1.5 }}>
        <Typography variant="h5" gutterBottom>
          {event.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {event.description}
        </Typography>
        {event.image && (
          <img
            src={`http://localhost:4000${event.image}`}
            alt={event.title}
            style={{
              width: '100%',
              height: '200px',
              objectFit: 'cover',
              borderRadius: 8,
              marginTop: 10,
            }}
          />
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', padding: 1.5 }}>
        <Button size="small" color="secondary" onClick={() => onDelete(event._id)}>
          Delete
        </Button>
      </CardActions>
      <FaEdit
        style={{ position: 'absolute', top: 10, right: 10, cursor: 'pointer' }}
        size={30}
        color='#87CEEB'
        onClick={handleEditClick}
      />
      <EditEventModal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        event={event}
        fetchEvents={fetchEvents}
        setTrigger={setTrigger}
        trigger={trigger}
      />
    </Card>
  );
};

export default EventCard;
