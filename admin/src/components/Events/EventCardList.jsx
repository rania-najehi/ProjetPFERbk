import React from 'react';
import { Card, Button, Carousel } from 'react-bootstrap';
import { Trash, Pencil } from 'react-bootstrap-icons'; // Import des icônes Bootstrap
import './eventCardList.css'; // Assurez-vous que ce fichier CSS est correctement configuré
import imagePlaceholder from "../../assets/image.png";

const EventCardList = ({ events, onDelete, onUpdate }) => {
  return (
    <div className="event-card-list">
      {events.map(event => (
        <Card key={event._id} className="event-card mb-4">
          {/* Affichage du carrousel d'images */}
          <div className="card-img-container">
            {event.images.length > 0 ? (
              <Carousel>
                {event.images.map((image, index) => (
                  <Carousel.Item key={index}>
                    <img
                      className="d-block w-100"
                      src={`http://localhost:4000${image}`} // Assurez-vous que l'URL est correcte
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
                className="card-img"
              />
            )}
          </div>

          {/* Corps de la carte avec les informations de l'événement */}
          <Card.Body className="event-card-body">
            <Card.Title>{event.title || 'No title available'}</Card.Title>

            <Card.Text>
              {event.description || 'Description not available'}
            </Card.Text>

            <Card.Text>
              {event.date ? (
                <>
                  <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                  <br />
                </>
              ) : (
                'Date not available'
              )}

              {event.startTime && event.endTime ? (
                <>
                  <strong>Temps de début:</strong> {new Date(event.startTime).toLocaleTimeString()}
                  <br />
                  <strong>Temps de fin:</strong> {new Date(event.endTime).toLocaleTimeString()}
                  <br />
                </>
              ) : (
                'Start and End Time not available'
              )}

              {event.location ? (
                <>
                  <strong>Localisation:</strong> {event.location.address || 'Address not available'} (Lat: {event.location.latitude || 'N/A'}, Lon: {event.location.longitude || 'N/A'})
                  <br />
                  {/* Affichage de Google Maps */}
                  {event.location.latitude && event.location.longitude ? (
                    <div className="map-container">
                      <iframe
                        width="100%"
                        height="200"
                        frameBorder="0"
                        style={{ border: 0 }}
                        src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyCkOwHcL-AC9cJsSBKHSCiiMdk3DwSCrc0&center=${event.location.latitude},${event.location.longitude}&zoom=15`}
                        allowFullScreen
                        title="Event Location"
                      ></iframe>
                    </div>
                  ) : (
                    'Map not available'
                  )}
                </>
              ) : (
                'Location not available'
              )}

              <strong>Organisateur:</strong> {event.eventOrganizer || 'Organizer not available'}
              <br />
              <strong>Notes:</strong> {event.notes || 'No additional notes'}
              <br />
              <strong>Catgorie:</strong> {event.category || 'No category'}
            </Card.Text>
          </Card.Body>

          {/* Boutons d'actions pour Update et Delete fixés en bas */}
          <div className="card-buttons">
            <Button variant="outline-primary" className="mr-2" onClick={() => onUpdate(event._id)}>
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
