import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../preview.css";
import moment from "moment";
import {
  faEnvelope,
  faPhone,
  faGraduationCap,
  faBriefcase,
  faProjectDiagram,
  faCogs,
} from "@fortawesome/free-solid-svg-icons";
import { CircularProgress, Box } from "@mui/material";
import { Context } from "../../../main.jsx";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

const StudentPreview = () => {
  const { token } = useContext(Context);

  const [studentData, setStudentData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/getSections", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStudentData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }
  if (loading) {
    return <div className="loader2"></div>;
  }

  if (!studentData) {
    return <p>No data available</p>;
  }

  const { user, education, workHistory, proj, skills } = studentData;
  return (
    <div id="container">
      {!loading && studentData ? (
        <>
          <div id="profile">
            <div id="image">
              <img
                id="profile-photo"
                src={`http://localhost:4000/uploads/${user.studentAvatar}`}
                alt={`${user.firstName} ${user.lastName}`}
              />
              <a href="#">
                <i className="fas fa-pen stroke-transparent"></i>
              </a>
            </div>
            <p id="name">
              {user.firstName} {user.lastName}
              <br />
              <span id="email">{user.email}</span>
            </p>

            <div id="social-links">
              <a href={`mailto:${user.email}`}>
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="stroke-transparent"
                />
              </a>
              <a href={`tel:${user.phone}`}>
                <FontAwesomeIcon
                  icon={faPhone}
                  className="stroke-transparent"
                />
              </a>
              <a href={user.linkedin}>
                <FontAwesomeIcon
                  icon={faLinkedin}
                  className="stroke-transparent"
                />
              </a>
              <a href={user.github}>
                <FontAwesomeIcon
                  icon={faGithub}
                  className="stroke-transparent"
                />
              </a>
            </div>
            <hr width="100%" />
            <div id="about">
              <p>About</p>
              <a href="#">
                <i className="fas fa-pen stroke-transparent-blue"></i>
              </a>
            </div>

            <p id="more-about">
              More about me
              <br />
              <span>{user.about}</span>
            </p>
            <p id="telephone">
              Telephone
              <br />
              <strong>{user.phone}</strong>
            </p>
          </div>
          <div id="info-cards">
            <div className="card">
              <p>
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="stroke-transparent"
                />
                &nbsp;&nbsp;&nbsp;Work Experience
              </p>
              {workHistory.map((work) => (
                <div key={work._id}>
                  <p className="tags">
                    {work.position} at {work.company}
                    <br />
                    <span>
                      {work.employmentType} |{" "}
                      {`${moment(work.startDate, "YYYY-MM").format(
                        "MMM YYYY"
                      )} - ${
                        !work.isCurrent
                          ? moment(work.endDate, "YYYY-MM").format("MMM YYYY")
                          : "Ongoing"
                      }`}
                    </span>
                  </p>
                  <p id="designation">{work.description}</p>
                </div>
              ))}
            </div>
            <div className="card">
              <p>
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="stroke-transparent"
                />
                &nbsp;&nbsp;&nbsp;Education
              </p>
              {education.map((edu) => (
                <div key={edu._id}>
                  <p className="tags">
                    {edu.degree} from {edu.college} ({edu.level})
                    <br />
                    <span>
                      {" "}
                      {`${moment(edu.startDate, "YYYY-MM").format(
                        "MMM YYYY"
                      )} - ${
                        !edu.stillEnrolled
                          ? moment(edu.endDate, "YYYY-MM").format("MMM YYYY")
                          : "Ongoing"
                      }`}
                    </span>
                  </p>
                  <a className="edit" href="#">
                    <i className="fas fa-pen stroke-transparent-blue"></i>
                  </a>
                </div>
              ))}
            </div>
            <div className="card">
              <p>
                <FontAwesomeIcon
                  icon={faProjectDiagram}
                  className="stroke-transparent"
                />
                &nbsp;&nbsp;&nbsp;Projects
              </p>
              {proj.map((project) => (
                <div key={project._id}>
                  <p className="tags">
                    {project.name}
                    <br />
                    <span>
                      {" "}
                      {`${moment(project.startDate, "YYYY-MM").format(
                        "MMM YYYY"
                      )} - ${moment(project.endDate, "YYYY-MM").format(
                        "MMM YYYY"
                      )}`}
                    </span>
                    <br />
                    <span>
                      Tech Stack: {project.techStack.languages.join(", ")},{" "}
                      {project.techStack.backend.join(", ")},{" "}
                      {project.techStack.database.join(", ")},{" "}
                      {project.techStack.cloud.join(", ")}
                    </span>
                  </p>
                  <a className="edit" href={project.githubLink}>
                    GitHub Link
                  </a>
                  <p id="designation">{project.description}</p>
                </div>
              ))}
            </div>
            <div className="card">
              <p>
                <FontAwesomeIcon icon={faCogs} className="stroke-transparent" />
                &nbsp;&nbsp;&nbsp;Skills
              </p>
              <p className="tags">
                Technical Skills:
                <br />
                {skills.technicalSkills.map((techSkill) => (
                  <span key={techSkill._id}>
                    {techSkill.skill} ({techSkill.level})
                  </span>
                ))}
              </p>
              <p className="tags">
                Soft Skills:
                <br />
                {skills.softSkills.map((softSkill) => (
                  <span key={softSkill._id}>{softSkill.skill}</span>
                ))}
              </p>
              <p className="tags">
                Languages:
                <br />
                {skills.languages.map((lang) => (
                  <span key={lang._id}>
                    {lang.language} ({lang.proficiency})
                  </span>
                ))}
              </p>
            </div>
          </div>
        </>
      ) : (
        <Box
          sx={{
            height: "70vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </div>
  );
};

export default StudentPreview;
