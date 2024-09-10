import express from "express";
const router = express.Router();
import {
  addMessage,
  getAllMessages,
  removeMessage,
  getAllRoomByUserId,
  createRoom,
  getUsersTobeConnection,
  getUsersConnections,
} from "../controllers/chat.js";
import {
  isStudentAuthenticated,
  isAdminAuthenticated,
} from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
router.post("/", upload.single("file"), addMessage);
router.get(
  "/connection/:page/:limit",
  isStudentAuthenticated,
  getUsersConnections
);
router.get(
  "/norelated/:page/:limit",
  isStudentAuthenticated,
  getUsersTobeConnection
);
router.get("/:roomId", getAllMessages);
router.post("/:user1/", isStudentAuthenticated, createRoom);
router.get("/room/:userId", getAllRoomByUserId);

router.delete("/:id", removeMessage);

export default router;
