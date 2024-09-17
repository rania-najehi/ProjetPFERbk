import React, { useState } from 'react';
import { Card, Button, Carousel } from 'react-bootstrap';
import { Trash, Pencil, ChevronUp, ChevronDown } from 'react-bootstrap-icons';
import './eventCardList.css';
import imagePlaceholder from "../../assets/image.png";

const EventCard = ({ event, onDelete, onUpdate }) => {
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);

  const toggleDetails = () => {
    setIsDetailsVisible(prev => !prev);
  };

  // Shorten the description if necessary
  const getShortDescription = (description) => {
    if (!description) return 'Description not available';
    return description.length > 50 ? description.substring(0, 50) + '...' : description;
  };

  return (
    <Card key={event._id} className="event-card mb-4">
      <Card.Body className="event-card-body">
        {/* Title */}
        <Card.Title className="event-card-title" style={{ color: 'red', fontSize: '1.5rem', fontStyle: 'italic' }}>
          {event.title || 'No title available'}
        </Card.Title>

      

        {/* Image Carousel */}
        <div className="card-img-container">
          {event.images.length > 0 ? (
            <Carousel>
              {event.images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img
                    className="d-block w-100 event-card-img"
                    src={`http://localhost:4000${image}`}
                    alt={`Image ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <Card.Img
              variant="top"
              src={imagePlaceholder}
              alt="Placeholder"
              className="event-card-img"
            />
          )}
        </div>

        {/* Description */}
        <Card.Text className="mt-3">
          <div><strong>Description:</strong> {isDetailsVisible || event.description.length <= 50 ? event.description : getShortDescription(event.description)}</div>
        </Card.Text>

        {/* Event Details */}
        {isDetailsVisible && (
          <Card.Text className="event-details">
            <div>
              {event.date ? (
                <>
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </>
              ) : (
                'Date non valable'
              )}
            </div>
            <div>
              {event.startTime && event.endTime ? (
                <>
                  <strong>Dade Début:</strong> {new Date(event.startTime).toLocaleTimeString()}
                  <br />
                  <strong>Heure Fin:</strong> {new Date(event.endTime).toLocaleTimeString()}
                </>
              ) : (
                'non Valable'
              )}
            </div>
            <div><strong>Catégorie:</strong> {event.category || 'No category available'}</div>
            <div><strong>Organisateur:</strong> {event.eventOrganizer || 'Organizer not available'}</div>
            <div><strong>Note:</strong> {event.notes || 'No notes added'}</div>
          </Card.Text>
        )}
        
        {/* Details Button Always at the Bottom */}
        <Card.Text>
          <div className="details-button-wrapper">
            <span
              onClick={toggleDetails}
              className="details-button"
              style={{ cursor: 'pointer' }}
            >
              {isDetailsVisible ? <ChevronUp /> : <ChevronDown />}
            </span>
          </div>
        </Card.Text>
      </Card.Body>

      {/* Edit and Delete Buttons */}
      <div className="card-buttons">
        <Button variant="outline-primary" className="mr-2" onClick={() => onUpdate(event)}>
          <Pencil />
        </Button>
        <Button variant="outline-danger" onClick={() => onDelete(event._id)}>
          <Trash />
        </Button>
      </div>
    </Card>
  );
};

const EventCardList = ({ events, onDelete, onUpdate }) => {
  return (
    <div className="event-card-list">
      {events.map(event => (
        <EventCard
          key={event._id}
          event={event}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  );
};

export default EventCardList;
