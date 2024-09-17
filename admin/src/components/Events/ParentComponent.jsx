import React, { useState } from 'react';
import EventCardList from './EventCardList'; // Assure-toi que le chemin est correct

const ParentComponent = () => {
  const [visibleEventId, setVisibleEventId] = useState(null);
  const [events, setEvents] = useState([
    // Ajoute des données d'événements ici
    {
      _id: '1',
      title: 'Événement 1',
      description: 'Description de l’événement 1',
      date: '2024-09-15',
      startTime: '2024-09-15T09:00:00',
      endTime: '2024-09-15T17:00:00',
      category: 'Catégorie 1',
      eventOrganizer: 'Organisateur 1',
      notes: 'Notes 1',
      images: ['/path/to/image1.jpg', '/path/to/image2.jpg']
    },
    {
      _id: '2',
      title: 'Événement 2',
      description: 'Description de l’événement 2',
      date: '2024-09-16',
      startTime: '2024-09-16T10:00:00',
      endTime: '2024-09-16T18:00:00',
      category: 'Catégorie 2',
      eventOrganizer: 'Organisateur 2',
      notes: 'Notes 2',
      images: []
    }
    // Ajoute d’autres événements si nécessaire
  ]);

  const handleViewDetails = (id) => {
    // Toggle la visibilité des détails de l'événement
    setVisibleEventId(visibleEventId === id ? null : id);
  };

  const handleDelete = (id) => {
    // Supprimer l'événement par ID
    setEvents(events.filter(event => event._id !== id));
  };

  const handleUpdate = (updatedEvent) => {
    // Mettre à jour l'événement
    setEvents(events.map(event =>
      event._id === updatedEvent._id ? updatedEvent : event
    ));
  };

  return (
    <div>
      <EventCardList
        events={events}
        onDelete={handleDelete}
        onUpdate={handleUpdate}
        onViewDetails={handleViewDetails}
        visibleEventId={visibleEventId}
      />
    </div>
  );
};

export default ParentComponent;
