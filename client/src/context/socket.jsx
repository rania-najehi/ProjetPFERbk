import React, { createContext } from "react";
import io from "socket.io-client";

const chatSocket = io("http://localhost:3000/chat"); // Chat namespace
const notificationSocket = io("http://localhost:3000/notification"); // Notification namespace

const SocketContext = createContext();

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={{ chatSocket, notificationSocket }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
