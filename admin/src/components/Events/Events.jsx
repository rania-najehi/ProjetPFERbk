import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import EventCard from './EventCard';
import AddEventModal from './AddEventModal.jsx';
import { Button } from '@mui/material';
import './events.css';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
const [trigger,setTrigger] = useState(false)
  useEffect(() => {
    fetchEvents();
  }, [trigger]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/event/events'); // Adjust URL based on your API endpoint
      setEvents(response.data);
    } catch (error) {
      toast.error('Failed to fetch events');
    }
  };


  const deleteEvent = async (eventId) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/event/events/${eventId}`).then((resp)=>console.log(resp)).catch((err)=>console.log(err)); // Adjust URL based on your API endpoint
      toast.success('Event deleted successfully');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event');
    }
  };

  return (
    <div className="events-page">
      <nav className="events-navbar">
        <ul>
          <li>
            <Button onClick={() => setShowModal(true)} variant="contained" color="primary">
              Add Event
            </Button>
          </li>
  
        </ul>
      </nav>



      {/* Modal for adding event */}
      <AddEventModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        fetchEvents={fetchEvents}
      />

      {/* Display events */}
      <div className="events-list">
        {events&&events.length === 0 ? (
          <p>No events available</p>
        ) : (
          events&&events.map((event) => (
            <EventCard key={event._id} event={event} onDelete={deleteEvent} setTrigger = {setTrigger} trigger={trigger} />
          ))
        )}
      </div>
    </div>
  );
};

export default EventsPage;
