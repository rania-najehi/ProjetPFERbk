import React from 'react';
import JobCard from './JobCard'; // Assurez-vous que le chemin est correct

const JobCardList = ({ jobOffers, onDelete, onViewDetails, visibleJobOfferId, onUpdate }) => {
  return (
    <div className="job-card-list">
      {jobOffers.length === 0 ? (
        <p>Aucune offre d'emploi trouvée.</p>
      ) : (
        jobOffers.map((jobOffer) => (
          <JobCard
            key={jobOffer._id}
            jobOffer={jobOffer}
            onDelete={onDelete}
            onViewDetails={onViewDetails}
            isVisible={visibleJobOfferId === jobOffer._id}
            onUpdate={onUpdate}
          />
        ))
      )}
    </div>
  );
};

export default JobCardList;
