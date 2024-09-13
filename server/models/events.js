import mongoose from "mongoose";

const { Schema } = mongoose;

// Define the ConcertEvent schema
const concertEventSchema = new Schema({
  title: {
    type: String,
   
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    
  },
  startTime: {
    type: String,
   
  },
  endTime: {
    type: String,
  },
  location: {
    address: {
      type: String,
     
    },
    latitude: {
      type: Number,
      
    },
    longitude: {
      type: Number,
     
    },
  },
  images: [String], // Array to store multiple image URLs
  eventOrganizer: {
    type: String,
    
  },
  notes: {
    type: String,
  },
  category: {
    type: String,
  },
});

// Create the model from the schema
const ConcertEvent = mongoose.model('ConcertEvent', concertEventSchema);
export default ConcertEvent;