import React, { useContext, useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import { BsPlus } from "react-icons/bs"; // Importation de l'icône BsPlus de react-icons

const JobOffer = () => {
  const [title, setTitle] = useState("");
  const { token } = useContext(Context);
  const [description, setDescription] = useState("");
  const [salary, setSalary] = useState("");
  const [location, setLocation] = useState("");
  const [email, setEmail] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobTypes, setJobTypes] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedSalary, setUpdatedSalary] = useState("");
  const [updatedLocation, setUpdatedLocation] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedJobType, setUpdatedJobType] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchJobTypes = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:4000/api/v1/job/getAllTypeJob"
        );
        setJobTypes(data.allTypeJob);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des types d'emploi:",
          error
        );
      }
    };

    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://127.0.0.1:4000/api/v1/job/getJobs"
        );
        setJobs(data.jobs);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des offres d'emploi:",
          error
        );
      }
    };

    fetchJobTypes();
    fetchJobs();
  }, []);

  if (!token) {
    return <Navigate to={"/login"} />;
  }

  const handleAddNewJob = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://127.0.0.1:4000/api/v1/job/createJob",
        { title, description, salary, location, email, jobType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      setJobs([...jobs, data.job]);
      setTitle("");
      setDescription("");
      setSalary("");
      setLocation("");
      setEmail("");
      setJobType("");
      setShowAddForm(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleUpdateModal = (job) => {
    setSelectedJobId(job._id);
    setUpdatedTitle(job.title);
    setUpdatedDescription(job.description);
    setUpdatedSalary(job.salary);
    setUpdatedLocation(job.location);
    setUpdatedEmail(job.email);
    setUpdatedJobType(job.jobType._id);
  };

  const handleUpdateJob = async () => {
    try {
      const { data } = await axios.put(
        `http://127.0.0.1:4000/api/v1/job/updateJobs/${selectedJobId}`,
        {
          title: updatedTitle,
          description: updatedDescription,
          salary: updatedSalary,
          location: updatedLocation,
          email: updatedEmail,
          jobType: updatedJobType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(data.message);
      const updatedJobs = jobs.map((job) =>
        job._id === selectedJobId ? data.job : job
      );
      setJobs(updatedJobs);
      setSelectedJobId(null);
      setUpdatedTitle("");
      setUpdatedDescription("");
      setUpdatedSalary("");
      setUpdatedLocation("");
      setUpdatedEmail("");
      setUpdatedJobType("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const { data } = await axios.delete(
        `http://127.0.0.1:4000/api/v1/job/deleteJob/${jobId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(data.message);
      const updatedJobs = jobs.filter((job) => job._id !== jobId);
      setJobs(updatedJobs);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="page ">
      <Container fluid>
        <div className="banner">
          <Row className="justify-content-center mt-4">
            <Col md={10}>
              <Card>
                <Card.Body>
                  {!showAddForm ? (
                    <Button
                      onClick={() => setShowAddForm(true)}
                      variant="link"
                      className="p-0"
                    >
                      <BsPlus size={18} className="mr-1" />
                      Ajouter un nouvel emploi
                    </Button>
                  ) : (
                    <Form onSubmit={handleAddNewJob}>
                      <Form.Group controlId="title">
                        <Form.Label>Titre</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Titre d'emploi"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          as="textarea"
                          placeholder="Description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="salary">
                        <Form.Label>Salaire</Form.Label>
                        <Form.Control
                          type="number"
                          placeholder="Salaire"
                          value={salary}
                          onChange={(e) => setSalary(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="location">
                        <Form.Label>Adresse</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Adresse"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder="Entrez votre email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </Form.Group>
                      <Form.Group controlId="jobType">
                        <Form.Label>Type d'emploi</Form.Label>
                        <Form.Control
                          as="select"
                          value={jobType}
                          onChange={(e) => setJobType(e.target.value)}
                          required
                        >
                          <option value="">Choisir un type d'emploi</option>
                          {jobTypes.map((type) => (
                            <option key={type._id} value={type._id}>
                              {type.jobTypeName}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                      <Button variant="primary" type="submit" block>
                        <BsPlus className="mr-1" /> Ajouter
                      </Button>
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowAddForm(false)}
                        block
                      >
                        Annuler
                      </Button>
                    </Form>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>

        <Row className="justify-content-center mt-4">
          <Col md={10}>
            <h2 className="text-center mb-4">Liste des Offres d'emploi</h2>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Description</th>
                  <th>Salaire</th>
                  <th>Adresse</th>
                  <th>Email</th>
                  <th>Type d'emploi</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job._id}>
                    <td>{job.title}</td>
                    <td>{job.description}</td>
                    <td>{job.salary}</td>
                    <td>{job.location}</td>
                    <td>{job.email}</td>
                    <td>{job.jobType ? job.jobType.jobTypeName : "N/A"}</td>
                    <td>
                      <Button
                        variant="info"
                        onClick={() => handleUpdateModal(job)}
                      >
                        Modifier
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleDeleteJob(job._id)}
                        className="ml-2"
                      >
                        Supprimer
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Modal
          show={selectedJobId !== null}
          onHide={() => setSelectedJobId(null)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Modifier un emploi</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="updatedTitle">
                <Form.Label>Titre</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nouvel Emploi"
                  value={updatedTitle}
                  onChange={(e) => setUpdatedTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="updatedDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Description"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="updatedSalary">
                <Form.Label>Salaire</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Nouveau Salaire"
                  value={updatedSalary}
                  onChange={(e) => setUpdatedSalary(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="updatedLocation">
                <Form.Label>Adresse</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Entrer l'adresse"
                  value={updatedLocation}
                  onChange={(e) => setUpdatedLocation(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="updatedEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="updatedJobType">
                <Form.Label>Type d'emploi</Form.Label>
                <Form.Control
                  as="select"
                  value={updatedJobType}
                  onChange={(e) => setUpdatedJobType(e.target.value)}
                  required
                >
                  <option value="">Sélectionner un type</option>
                  {jobTypes.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.jobTypeName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedJobId(null)}>
              Fermer
            </Button>
            <Button variant="primary" onClick={handleUpdateJob}>
              Modifier
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </section>
  );
};

export default JobOffer;
