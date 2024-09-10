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
router.get("/connection", isStudentAuthenticated, getUsersConnections);
router.get("/norelated", isStudentAuthenticated, getUsersTobeConnection);
router.get("/:roomId", getAllMessages);
router.post("/:user1/:user2", createRoom);
router.get("/room/:userId", getAllRoomByUserId);

router.delete("/:id", removeMessage);

export default router;
