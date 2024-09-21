import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';
import './jobOffer.css'; // Ensure this path is correct
import JobCardList from './JobCardList.jsx'; // Ensure this path is correct
import JobModal from './JobCard.jsx'; 

const JobOffer = () => {
  const [jobOffers, setJobOffers] = useState([]);
  const [filteredJobOffers, setFilteredJobOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJobOffer, setSelectedJobOffer] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleJobOfferId, setVisibleJobOfferId] = useState(null); // New state for toggling details view

  // Fetch job offers from the API
  const fetchJobOffers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:4000/api/v1/job/getJobs');
      console.log('Jobs received in JobOffer:', response.data); // Add this log to check the received data
      setJobOffers(response.data);
      setFilteredJobOffers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des offres d\'emploi', error);
    }
  };

  useEffect(() => {
    fetchJobOffers();
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = jobOffers.filter(job =>
      job.title.toLowerCase().includes(value) ||
      job.description.toLowerCase().includes(value)
    );
    setFilteredJobOffers(filtered);
  };

  // Toggle visibility of job offer details
  const handleViewDetails = (jobOfferId) => {
    setVisibleJobOfferId(visibleJobOfferId === jobOfferId ? null : jobOfferId);
  };

  // Show modal
  const handleShow = () => setShowModal(true);

  // Hide modal
  const handleClose = () => {
    setShowModal(false);
    setSelectedJobOffer(null);
  };

  // Handle job offer deletion
  const handleDelete = async (jobOfferId) => {
    try {
      await axios.delete(`http://127.0.0.1:4000/api/v1/job/deleteJob/${jobOfferId}`);
      fetchJobOffers();
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'offre d\'emploi', error);
    }
  };

  // Handle job offer update
  const handleUpdate = async (updatedJobOffer) => {
    try {
      await axios.put(`http://127.0.0.1:4000/api/v1/job/updateJob/${updatedJobOffer._id}`, updatedJobOffer);
      fetchJobOffers();
      handleClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'offre d\'emploi', error);
    }
  };

  return (
    <>
      <div className="job-offers-controls">
        <div className="add-job-offer-btn">
          <Button variant="primary" onClick={handleShow}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-circle"
              viewBox="0 0 16 16"
            >
              <path d="M8 3a.5.5 0 0 1 .5.5V7h3.5a.5.5 0 0 1 0 1H8.5v3.5a.5.5 0 0 1-1 0V8H4a.5.5 0 0 1 0-1h3.5V3.5A.5.5 0 0 1 8 3z" />
              <path d="M8 0a8 8 0 1 0 8 8A8 8 0 0 0 8 0zm0 15a7 7 0 1 1 7-7 7 7 0 0 1-7 7z" />
            </svg>
          </Button>
        </div>
        <Form onSubmit={(e) => e.preventDefault()} className="search-form">
          <Form.Control
            type="text"
            placeholder="Recherche"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
          <Button variant="outline-primary" type="submit">
            Rechercher
          </Button>
        </Form>
      </div>

      <JobCardList
        jobOffers={filteredJobOffers}
        onDelete={handleDelete}
        onViewDetails={handleViewDetails}
        visibleJobOfferId={visibleJobOfferId}
        onUpdate={(job) => {
          setSelectedJobOffer(job);
          handleShow();
        }}
      />
      <JobModal
        show={showModal}
        handleClose={handleClose}
        fetchJobOffers={fetchJobOffers}
        jobOffer={selectedJobOffer}
        handleUpdate={handleUpdate}
      />
    </>
  );
};

export default JobOffer;
