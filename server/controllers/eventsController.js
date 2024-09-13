import ConcertEvent from "../models/events.js";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

import multer from 'multer';

const UPLOADS_DIR = path.resolve('path', 'to', 'your', 'uploads'); // Update this path



// Create Event (POST /events)
export const createEvent = async (req, res) => {
  try {
    // Collect all form data
    const newEvent = new ConcertEvent({
      ...req.body, // Spread operator to include all form data
      images: [], // Initialize images array
    });

    // Check if multiple files are uploaded
    if (req.files && req.files.length > 0) {
      req.files.forEach(file => {
        newEvent.images.push(`/uploads/${file.filename}`);
      });
    }

    // Save the event with images
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Events (GET /events)
export const getEvents = async (req, res) => {
  try {
    // Retrieve all events from the database
    const events = await ConcertEvent.find();

    // Return the events in the response
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Event (PUT /events/:id)
export const updateEvent = async (req, res) => {
  const { id } = req.params;

  const eventUpdates = req.body; // Capture all form data for update

  if (req.files && req.files.length > 0) {
    eventUpdates.images = []; // Initialize images array for potential replacement
    req.files.forEach(file => {
      eventUpdates.images.push(`/uploads/${file.filename}`);
    });
  }

  try {
    const updatedEvent = await ConcertEvent.findByIdAndUpdate(id, eventUpdates, { new: true, runValidators: true });
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Event (DELETE /events/:id)
export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await ConcertEvent.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete associated images from the 'uploads' directory
    if (deletedEvent.images.length > 0) {
      deletedEvent.images.forEach((image) => {
        const imagePath = path.join(UPLOADS_DIR, path.basename(image));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};














/*
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
    const newEvent = new Event(req.body); // Use Event model instead of EventForm
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
};*/
