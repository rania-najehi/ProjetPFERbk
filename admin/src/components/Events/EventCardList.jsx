import React from 'react';
import { Card, Button, Carousel } from 'react-bootstrap';
import { Trash, Pencil, ChevronUp, ChevronDown } from 'react-bootstrap-icons';
import './eventCardList.css';
import imagePlaceholder from "../../assets/image.png";

const EventCardList = ({ events, onDelete, onUpdate, onViewDetails, visibleEventId }) => {
  return (
    <div className="event-card-list">
      {events.map(event => (
        <Card key={event._id} className="event-card mb-4">
          <Card.Body className="event-card-body">
            <Card.Title className="event-card-title">
              {event.title || 'No title available'}
            </Card.Title>
            <div className="event-card-date">
              {event.creationDate ? new Date(event.creationDate).toLocaleDateString() : 'Date not available'}
            </div>
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

            <Card.Text>
              <div><strong>Description:</strong> {event.description || 'Description not available'}</div>
              <Button 
                variant="outline-secondary" 
                onClick={() => onViewDetails(event._id)} 
                className="details-button"
              >
                {visibleEventId === event._id ? <ChevronUp /> : <ChevronDown />}
              </Button>
            </Card.Text>

            {visibleEventId === event._id && (
              <Card.Text className="event-details">
                <div><strong>Description:</strong> {event.description || 'Description not available'}</div>
                <div>
                  {event.date ? (
                    <>
                      <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                    </>
                  ) : (
                    'Date not available'
                  )}
                </div>
                <div>
                  {event.startTime && event.endTime ? (
                    <>
                      <strong>Date de début:</strong> {new Date(event.startTime).toLocaleTimeString()}
                      <br />
                      <strong>Date de fin:</strong> {new Date(event.endTime).toLocaleTimeString()}
                    </>
                  ) : (
                    'Start and End Time not available'
                  )}
                </div>
                <div><strong>Catégorie:</strong> {event.category || 'Pas de catégorie'}</div>
                <div><strong>Organisateur:</strong> {event.eventOrganizer || 'Organizer not available'}</div>
                <div><strong>Notes:</strong> {event.notes || 'Pas de note ajouté'}</div>
              </Card.Text>
            )}
          </Card.Body>

          <div className="card-buttons">
            <Button variant="outline-primary" className="mr-2" onClick={() => onUpdate(event)}>
              <Pencil />
            </Button>
            <Button variant="outline-danger" onClick={() => onDelete(event._id)}>
              <Trash />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default EventCardList;
