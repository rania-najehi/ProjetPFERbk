import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

const JobCard = ({ jobOffer, onDelete, onUpdate }) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!jobOffer) {
    return null;
  }

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="job-card-accordion" style={{ marginBottom: '20px', margin: '0 auto', width: '60%' }}>
      <div className="card">
        <div className="card-header" id={`heading-${jobOffer._id}`}>
          <h2 className="mb-0">
            <button 
              className="btn btn-link" 
              type="button" 
              onClick={toggleAccordion}
              aria-expanded={isOpen}
            >
              {jobOffer.title} - <small>{jobOffer.salary} € - {new Date(jobOffer.createdAt).toLocaleDateString()}</small>
            </button>
          </h2>
        </div>

        {isOpen && (
          <div className="card-body d-flex align-items-start justify-content-between">
            {/* Description à gauche */}
            <div className="job-details" style={{ flex: '1', marginRight: '20px' }}>
              <p><strong>Description:</strong> {jobOffer.description}</p>
              <p><strong>Lieu:</strong> {jobOffer.location}</p>
              <p><strong>Entreprise:</strong> {jobOffer.company}</p>
              <p><strong>Salaire:</strong> {jobOffer.salary} €</p>
              <p><strong>Contact:</strong> {jobOffer.email}</p>
            </div>

            {/* Logo/Avatar à droite */}
            <div className="job-logo-container">
              {jobOffer.images && jobOffer.images.length > 0 ? (
                <img
                  src={`http://127.0.0.1:4000${jobOffer.images[0]}`} // Premier logo/image
                  alt="Company Logo"
                  className="job-logo"
                />
              ) : (
                <img
                  src="path-to-placeholder-image.jpg" // Image par défaut si pas de logo
                  alt="Company Logo"
                  className="job-logo"
                />
              )}
            </div>
          </div>
        )}

        {isOpen && (
          <div className="job-actions mt-3">
            <Button variant="warning" onClick={() => onUpdate(jobOffer)}>
              Modifier
            </Button>

            <Button variant="danger" onClick={() => onDelete(jobOffer._id)}>
              Supprimer
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobCard;
