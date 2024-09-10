import mongoose from "mongoose";

const { Schema } = mongoose;

// Define schema
const WorkHistorySchema = new Schema({
  company: {
    type: String,
  },
  description: {
    type: String,
  },
  position: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  isCurrent: {
    type: Boolean,
    default: false,
  },
  employmentType: {
    type: String,
    enum: [
      "Full Time",
      "Part Time",
      "Freelance",
      "Self-Employed",
      "Contract",
      "Internship",
      "Other",
    ],
    default: "Full Time",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
    required: true,
  },
});

// Create and export model
const WorkHistory = mongoose.model("WorkHistory", WorkHistorySchema);

export default WorkHistory;
