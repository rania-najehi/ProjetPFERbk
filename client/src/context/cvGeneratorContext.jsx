import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Create the UserContext
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState([]);

  // Function to get the current user
  const getCurrentUser = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/user/student/me",
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  // Function to update a user record
  const updateUserRecord = async (updatedData) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/updateSections",
        updatedData,
        {
          withCredentials: true,
        }
      );
      setUser(response.data.user);
      return response.data.user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // Function to get all user records
  const getAllUserRecords = async () => {
    try {
      const response = await axios.get("http://localhost:4000/getSections", {
        withCredentials: true,
      });
      console.log("====================================");
      console.log(response.data);
      console.log("====================================");
      setData(response.data);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        getCurrentUser,
        updateUserRecord,
        getAllUserRecords,
        data,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
