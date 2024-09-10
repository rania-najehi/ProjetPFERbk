import express from 'express';
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from '../controllers/eventsController.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

router.post('/events', upload.single('image'), createEvent);
router.get('/events', getEvents);
router.get('/events/:id', getEventById);
router.put('/events/:id', upload.single('image'), updateEvent);
router.delete('/events/:id', deleteEvent);

export default router; 