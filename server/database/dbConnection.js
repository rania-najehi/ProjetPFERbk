import mongoose from "mongoose";

export const dbConnection = async () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      dbName: "MERN_STACK_SCHOOL_MANAGMENT_SYSTEM",
    })
    .then(() => {
      console.log("Connected to Database!");
    })
    .catch((err) => {
      console.log(`Somme error occured while connecting to DATABSE: ${err}`);
    });
};
