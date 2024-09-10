import Education from "../models/education.js";
import WorkHistory from "../models/experience.js";
import Project from "../models/projects.js";
import Skills from "../models/skills.js";

// Function to handle deleting and inserting records
export const updateSectionRecords = async (req, res) => {
  const { section, records } = req.body; // 'section' can be 'education', 'workHistory', or 'projects'

  try {
    let model;

    // Determine the model based on the section
    switch (section) {
      case "education":
        model = Education;
        break;
      case "workHistory":
        model = WorkHistory;
        break;
      case "projects":
        model = Project;
        break;
      case "Skill":
        model = Skills;
        break;
      default:
        return res.status(400).json({ message: "Invalid section" });
    }
    if (records.length < 0) {
      await model.deleteMany({ user: req.user._id });
      res
        .status(200)
        .json({ message: `${section} records updated successfully` });
    }
    // Delete existing records for the user
    await model.deleteMany({ user: req.user._id });

    // Insert new records
    const newRecords = records.map((record) => ({
      ...record,
      user: req.user._id,
    }));
    await model.insertMany(newRecords);

    res
      .status(200)
      .json({ message: `${section} records updated successfully` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// Controller function to get all sections for a user
export const getAllUserSections = async (req, res) => {
  try {
    // Fetch all sections related to the user
    const education = await Education.find({ user: req.user._id });
    const workHistory = await WorkHistory.find({ user: req.user._id });
    const proj = await Project.find({ user: req.user._id });
    const skills = await Skills.findOne({ user: req.user._id });

    res.status(200).json({
      user: req.user,
      education,
      workHistory,
      proj,
      skills,
    });
  } catch (error) {
    // res.status(500).json({ message: "An error occurred", error });
    throw new Error(error);
  }
};

export default updateSectionRecords;
