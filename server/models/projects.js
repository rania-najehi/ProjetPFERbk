import mongoose from "mongoose";

const { Schema } = mongoose;

// Define schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  githubLink: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  techStack: {
    languages: [
      {
        type: String,
        enum: ["JavaScript", "Python", "Java", "C++", "Ruby"],
      },
    ],
    frontend: [
      {
        type: String,
        enum: ["React", "Vue", "Angular", "Svelte"],
      },
    ],
    backend: [
      {
        type: String,
        enum: ["Node.js", "Express", "Django", "Flask"],
      },
    ],
    database: [
      {
        type: String,
        enum: ["MongoDB", "MySQL", "PostgreSQL", "SQLite"],
      },
    ],
    cloud: [
      {
        type: String,
        enum: ["AWS", "Azure", "Google Cloud", "Heroku"],
      },
    ],
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
});

// Create and export model
const Project = mongoose.model("Project", ProjectSchema);

export default Project;
