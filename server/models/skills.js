import mongoose from "mongoose";

const { Schema } = mongoose;

const SkillLevelEnum = ["Beginner", "Intermediate", "Advanced", "Expert"];
const LanguageProficiencyEnum = ["Basic", "Conversational", "Fluent", "Native"];

// Define schema
const SkillsSchema = new Schema({
  technicalSkills: [
    {
      skill: {
        type: String,
        required: true,
      },
      level: {
        type: String,
        enum: SkillLevelEnum,
        required: true,
      },
    },
  ],
  softSkills: [
    {
      skill: {
        type: String,
        required: true,
      },
    },
  ],
  languages: [
    {
      language: {
        type: String,

        required: true,
      },
      proficiency: {
        type: String,
        enum: LanguageProficiencyEnum,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
});

// Create and export model
const Skills = mongoose.model("Skills", SkillsSchema);

export default Skills;
