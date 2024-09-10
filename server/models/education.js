import mongoose from "mongoose";

const { Schema } = mongoose;

// Define schema
const EducationSchema = new Schema({
  degree: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  stillEnrolled: {
    type: Boolean,
    default: false,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
});

// Create and export model
const Education = mongoose.model("Education", EducationSchema);

export default Education;
