import React, { useState, createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import App from "./App.jsx";
import { SocketProvider } from "./context/socket.jsx";
export const Context = createContext();
const AppWrapper = () => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      getUser();
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);
  const getUser = async () => {
    try {
      const data = await axios.get(
        "http://127.0.0.1:4000/api/v1/user/admin/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(data.data.user);
      console.log(data.data);
    } catch (error) {
      throw error;
    }
  };
  return (
    <Context.Provider value={{ token, setToken, user }}>
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
