import ConcertEvent from "../models/events.js";

import path from "path";
import fs from "fs";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";

const UPLOADS_DIR = path.resolve("path", "to", "your", "uploads"); // Update this path
export const getOneEvents = catchAsyncErrors(async (req, res, next) => {
  try {
    const event = await ConcertEvent.findById(req.params.id)
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "sender",
          model: "User",
          select: "firstName lastName studentAvatar",
        },
      })
      .populate({
        path: "ups",
        model: "User",
        select: "firstName lastName studentAvatar",
      })
      .populate({
        path: "likes",
        model: "User",
        select: "firstName lastName studentAvatar",
      });
    if (!event) {
      return next(new ErrorHandler("Event not found", 404));
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Create Event (POST /events)
export const createEvent = catchAsyncErrors(async (req, res, next) => {
  console.log("req body", req.body);

  // Valider les champs requis dans la requête
  const {
    title,
    description,
    date,
    startTime,
    endTime,
    category,
    eventOrganizer,
    notes,
    location,
  } = req.body;

  if (
    !title ||
    !description ||
    !date ||
    !startTime ||
    !endTime ||
    !category ||
    !eventOrganizer ||
    !notes
  ) {
    return next(
      new ErrorHandler("Veuillez remplir tous les champs obligatoires.", 400)
    );
  }

  // Créer un nouvel événement
  const newEvent = new ConcertEvent({
    ...req.body, // Inclure tous les champs du formulaire
    location: {
      address: req.body.address,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
    },
    images: [], // Initialiser un tableau d'images vide
  });

  // Vérifier si des fichiers sont téléchargés
  if (req.files && req.files.length > 0) {
    req.files.forEach((file) => {
      // Ajouter les fichiers téléchargés au tableau d'images
      newEvent.images.push(`${file.filename}`);
    });
  }

  try {
    // Sauvegarder le nouvel événement
    await newEvent.save();

    // Renvoyer une réponse de succès avec l'événement créé
    res.status(201).json({
      success: true,
      message: "Événement créé avec succès",
      event: newEvent,
    });
  } catch (error) {
    // Si une erreur se produit, la renvoyer avec un message explicite
    return next(
      new ErrorHandler(
        "Erreur lors de la création de l'événement. Veuillez réessayer.",
        500
      )
    );
  }
});

// Get Events (GET /events)
export const getEvents = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 3;
    // Retrieve all events from the database
    const eventsCounts = await ConcertEvent.find();
    const events = await ConcertEvent.find()
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "sender",
          model: "User",
          select: "firstName lastName studentAvatar",
        },
      })
      .populate({
        path: "ups",
        model: "User",
        select: "firstName lastName studentAvatar",
      })
      .populate({
        path: "likes",
        model: "User",
        select: "firstName lastName studentAvatar",
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    // Return the events in the response
    res.status(200).json({
      events,
      currentPage: page,
      totalPages: Math.ceil(eventsCounts.length / limit),
    });
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
    req.files.forEach((file) => {
      eventUpdates.images.push(`/uploads/${file.filename}`);
    });
  }

  try {
    const updatedEvent = await ConcertEvent.findByIdAndUpdate(
      id,
      eventUpdates,
      { new: true, runValidators: true }
    );
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
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
      return res.status(404).json({ message: "Event not found" });
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

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Events by Category (GET /events/category/:category)
export const getEventsByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    // Recherche des événements correspondant à la catégorie
    const events = await ConcertEvent.find({ category: category });
    res.status(200).json(events);
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
