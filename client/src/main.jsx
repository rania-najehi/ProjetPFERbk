import React, { useState, createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { SocketProvider } from "./context/socket.jsx";
export const Context = createContext();
const AppWrapper = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  return (
    <Context.Provider value={{ token, setToken }}>
      <SocketProvider>
        <App />
      </SocketProvider>
    </Context.Provider>
  );
};
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
