import Event from "../models/events.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Properly define __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Handle file upload
const handleFileUpload = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject("No file uploaded");
    }
    const filePath = file.path;
    // Construct URL path relative to your server
    const fileUrl = `/uploads/${path.basename(filePath)}`;
    resolve(fileUrl);
  });
};

// Create Event
export const createEvent = async (req, res) => {
  try {
    const imageUrl = req.file ? await handleFileUpload(req.file) : null;

    const eventData = {
      ...req.body,
      image: imageUrl,
    };

    const event = new Event(eventData);
    await event.save();
    res.status(201).send(event);
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

// Get Events
export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({});
    res.status(200).send(events);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get Event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send();
    }
    res.status(200).send(event);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update Event
export const updateEvent = async (req, res) => {
  try {
    console.log(req.body,"req.body");

    let imageUrl = req.body.image;

    if (req.file) {
      imageUrl = await handleFileUpload(req.file);
    }

    const eventData = {
      title: req.body.title,
      description: req.body.description,
    };

    if (req.file) {
      eventData.image = imageUrl;
    }

    console.log(eventData, "eventData");
    const event = await Event.findByIdAndUpdate(req.params.id, eventData, { new: true, runValidators: true });
    console.log(event, "event");

    if (!event) {
      return res.status(404).send();
    }
    res.status(200).send(event);
  } catch (error) {
    res.status(400).send(error);
  }
};


// Delete Event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).send();
    }

    // Delete associated image file if exists
    if (event.image) {
      const imagePath = path.join(__dirname, '..', 'uploads', path.basename(event.image));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await event.deleteOne(); // Use deleteOne instead of remove
    res.status(200).send(event);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
};
