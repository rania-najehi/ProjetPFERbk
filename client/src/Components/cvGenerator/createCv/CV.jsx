import React, { forwardRef } from "react";
import "./CreateCv.css";
const Resume = ({ data }) => {
  const { user, education, workHistory, proj, skills } = data;
  return (
    <div id="resume_cv">
      <div className="header_cv">
        <img
          src={`http://localhost:4000/uploads/${user.studentAvatar}`}
          alt={`${user.firstName} ${user.lastName}`}
        />
        <div className="info_cv">
          <h1>
            {user.firstName} {user.lastName}
          </h1>
          <h2>{user.role}</h2>
          <div className="contacts_cv">
            <span>
              <i className="fas fa-envelope"></i> {user.email}
            </span>
            <span>
              <i className="fas fa-phone"></i> {user.phone}
            </span>
            <span>
              <i className="fab fa-github"></i>{" "}
              <a href={user.github}>{user.github}</a>
            </span>
            <span>
              <i className="fab fa-linkedin"></i>{" "}
              <a href={user.linkedin}>{user.linkedin}</a>
            </span>
          </div>
          <p>{user.about}</p>
        </div>
      </div>

      <div className="section_cv">
        <h3>Education</h3>
        {education.map((edu, index) => (
          <div className="item_cv" key={index}>
            <h4>
              {edu.degree} - {edu.college}
            </h4>
            <p>
              {edu.startDate} - {edu.endDate}
            </p>
          </div>
        ))}
      </div>

      <div className="section_cv">
        <h3>Work History</h3>
        {workHistory.map((work, index) => (
          <div className="item_cv" key={index}>
            <h4>
              {work.position} at {work.company}
            </h4>
            <p>
              {work.startDate} - {work.endDate}
            </p>
            <p>{work.description}</p>
          </div>
        ))}
      </div>

      <div className="section_cv">
        <h3>Projects</h3>
        {proj.map((project, index) => (
          <div className="item_cv" key={index}>
            <h4>{project.name}</h4>
            <p>
              <a href={project.githubLink}>{project.githubLink}</a>
            </p>
            <p>{project.description}</p>
            <p>
              <strong>Tech Stack:</strong>
            </p>
            <ul>
              {Object.entries(project.techStack).map(([key, value], index) => (
                <li key={index}>
                  <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong>{" "}
                  {value.join(", ")}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="section_cv skills_cv">
        <h3>Skills</h3>
        <div>
          <h4>Technical Skills</h4>
          {skills.technicalSkills.map((skill, index) => (
            <div className="skill_cv" key={index}>
              <span>{skill.skill}</span>
              <span>{skill.level}</span>
            </div>
          ))}
        </div>
        <div>
          <h4>Soft Skills</h4>
          {skills.softSkills.map((skill, index) => (
            <div className="skill_cv" key={index}>
              <span>{skill.skill}</span>
            </div>
          ))}
        </div>
        <div>
          <h4>Languages</h4>
          {skills.languages.map((language, index) => (
            <div className="skill_cv" key={index}>
              <span>{language.language}</span>
              <span>{language.proficiency}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resume;
