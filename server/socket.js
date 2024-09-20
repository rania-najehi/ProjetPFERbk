import express from "express";
const app = express();
import { v4 as uuidv4 } from "uuid";
import http from "http";
import fs from "fs";
import { Server } from "socket.io";
import cors from "cors";
const server = http.createServer(app);
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"],
  },
});
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
  })
);

const chatNamespace = io.of("/chat");
chatNamespace.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("join", (roomId) => {
    console.log("user join room", roomId);
    socket.join(roomId);
  });

  socket.on("typing", (data) => {
    console.log("user typing", data);
    socket.to(data.roomId).emit("typing", data);
  });
  socket.on("fileUpload", (data) => {
    const { file } = data;
    console.log("user uploaded file", file);

    const uniqueFileName = `${uuidv4()}-${file.filename}`;
    const filePath = path.join(__dirname, "/uploads", uniqueFileName);

    const writeStream = fs.createWriteStream(filePath);
    writeStream.write(Buffer.from(new Uint8Array(file.buffer)));
    writeStream.end();

    writeStream.on("finish", () => {
      console.log("File saved:", uniqueFileName);

      // Send back the file information only to the uploader
      chatNamespace.emit("fileUploadResponse", {
        success: true,
        message: "File uploaded successfully",
        file: {
          name: uniqueFileName,
          url: `http://localhost:3000/uploads/${uniqueFileName}`,
        },
      });
    });

    writeStream.on("error", (err) => {
      console.error("Error writing file:", err);
      socket.emit("fileUploadResponse", {
        success: false,
        message: "File upload failed",
      });
    });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });

  socket.on("chat_message", (msg) => {
    console.log("user message", msg);
    socket.to(msg.roomId).emit("chat_message", msg);
  });
});
const notificationNamespace = io.of("/notification");
notificationNamespace.on("connection", (socket) => {
  console.log("a user connected to notification");

  socket.on("join", (userId) => {
    console.log("user join room", userId);
    socket.join(userId);
  });

  socket.on("notification", (notification) => {
    notificationNamespace
      .to(notification.user._id)
      .emit("notification", notification);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected from notification", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
