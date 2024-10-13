import express from "express";
import {
  addComment,
  updateLike,
  updateUps,
  getAllevent,
  getAllCommentsByEventId,
  getAllSubscribedEvents,
  getAllLikedEvents,
} from "../controllers/eventAndcommentController.js";
import { upload } from "../middlewares/multer.js";
import { isStudentAuthenticated } from "../middlewares/auth.js";
const router = express.Router();
router.post("/", upload.single("file"), isStudentAuthenticated, addComment);
router.get("/", isStudentAuthenticated, getAllevent);
router.get("/allComments/:eventId/:page/:limit", getAllCommentsByEventId);
router.get("/allSubscribed/:eventId/:page/:limit", getAllSubscribedEvents);
router.get("/allLiked/:eventId/:page/:limit", getAllLikedEvents);
router.put("/likes/:eventId", isStudentAuthenticated, updateLike);
router.put("/ups/:eventId", isStudentAuthenticated, updateUps);

export default router;
