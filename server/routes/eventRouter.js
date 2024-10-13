import express from "express";
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  getEventsByCategory,
  getOneEvents,
} from "../controllers/eventsController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();
router.post("/events", upload.array("images", 5), createEvent);
router.get("/events/:page/:limit", getEvents);
router.get("/oneEvent/:id", getOneEvents);

//router.get('/events/:id', getEventById);
// Route to handle updating an event with multiple images
router.put("/events/:id", upload.array("images", 5), updateEvent); // Allow up to 5 images
router.delete("/events/:id", deleteEvent);
// router.get("/events/category/:category", getEventsByCategory);

export default router;
