import React from 'react';
import { Card } from 'react-bootstrap';
import './eventCardList.css'; // Assurez-vous que ce fichier CSS est correctement configuré
import imagePlaceholder from "../../assets/image.png";
const EventCardList = ({ events }) => {
  return (
    <div className="event-card-list">
       {events.map(event => (
        <Card key={event._id} className="mb-3">
          {event.images.length > 0 ? (
            <Card.Img
              variant="top"
              src={`http://localhost:4000${event.images[0]}`} // Assurez-vous que l'URL est correcte
              alt="Event Image"
              className="card-img-top"
            />
          ) : (
            <Card.Img
              variant="top"
              src={imagePlaceholder}
              alt="Placeholder"
              className="card-img-top"
            />
          )}
          <Card.Body>
            <Card.Title>{event.title || 'No title available'}</Card.Title>
            <Card.Text>{event.description || 'Description not available'}</Card.Text>
            <Card.Text>
              {event.date ? (
                <>
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  <br />
                </>
              ) : (
                'Date not available'
              )}
              {event.location ? (
                <>
                  <strong>Location:</strong> {event.location.address || 'Address not available'} (Lat: {event.location.latitude || 'N/A'}, Lon: {event.location.longitude || 'N/A'})
                  <br />
                </>
              ) : (
                'Location not available'
              )}
              <strong>Organizer:</strong> {event.eventOrganizer || 'Organizer not available'}
              <br />
              <strong>Notes:</strong> {event.notes || 'No additional notes'}
              <br />
              <strong>Category:</strong> {event.category || 'No category'}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default EventCardList;
