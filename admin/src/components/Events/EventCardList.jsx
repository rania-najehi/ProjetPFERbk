import React from 'react';
import { Card, Button, Carousel } from 'react-bootstrap';
import { Trash, Pencil } from 'react-bootstrap-icons';
import './eventCardList.css';
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
              <Card.Text>
  <div>
    <strong>Localisation :</strong> Champs-Élysées, Paris
    <br />
    (Lat: 48.8566, Lon: 2.3522)
    <br />
    <div className="map-container" style={{ marginTop: '10px' }}>
      <iframe
        width="100%"
        height="200"
        frameBorder="0"
        style={{ border: 0 }}
        src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyCkOwHcL-AC9cJsSBKHSCiiMdk3DwSCrc0&center=48.8566,2.3522&zoom=15`}
        allowFullScreen
        title="Localisation de l'évènement"
      ></iframe>
    </div>
  </div>
</Card.Text>
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
