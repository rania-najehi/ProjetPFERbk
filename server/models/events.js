import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
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
      required: true,
      validate: {
        validator: function (v) {
          return v >= -90 && v <= 90; // Latitude must be between -90 and 90
        },
        message: (props) => `${props.value} is not a valid latitude!`,
      },
    },
    longitude: {
      type: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v >= -180 && v <= 180; // Longitude must be between -180 and 180
        },
        message: (props) => `${props.value} is not a valid longitude!`,
      },
    },
  },
  images: [String], // Array to store multiple image URLs
  eventOrganizer: {
    type: String,
  },
  likes: [{ type: ObjectId, ref: "User" }],
  ups: [{ type: ObjectId, ref: "User" }],
  comments: [{ type: ObjectId, ref: "Comment" }],
  notes: {
    type: String,
  },
  category: {
    type: String,
  },
});

// Create the model from the schema
const ConcertEvent = mongoose.model("ConcertEvent", concertEventSchema);
export default ConcertEvent;
const seedEvents = async () => {
  try {
    const users = [
      "66ed86dc8a96ec169b2f9af3",
      "66ed86dc8a96ec169b2f9af4",
      "66eec6525bc694e12e1120be",
      "66eec6525bc694e12e1120bf",
      "66eec86fe98573ead8de626b",
    ];
    const comments = [
      "66ef2a90bea0353fe2e36e06",
      "66ef2a90bea0353fe2e36e07",
      "66ef2a90bea0353fe2e36e09",
      "66ef2a90bea0353fe2e36e0b",
      "66ef336c615e7eeb0f77bfd7",
    ];

    // Sample event images (replace with real image URLs)
    const eventImages = [
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fphoto%2F163064%2F&psig=AOvVaw3f6Xq5v6k9nR9dG9O8Q-58&ust=1701416592849000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPC846288PoCFQAAAAAdAAAAABAD&uact=8&ved=2ahUKEwib0u374Z_AAxU3pYkFHf3vD48Q9QF6BAgJEAE&usg=AOvVaw1q38O46ZvQp6q62u2L0u7Q",
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fphoto%2F4503619%2F&psig=AOvVaw30t_8fW6l216Q9O_rO3009&ust=1701416624376000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCNjh97i88PoCFQAAAAAdAAAAABAD&uact=8&ved=2ahUKEwi39_D34Z_AAxW2vI8BHbO5C1kQ9QF6BAgJEAE&usg=AOvVaw0K2424L2o9J_q6O7D2s2dM",
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fphoto%2F4144580%2F&psig=AOvVaw2tH0X5fX0x7t3v29W0z_qX&ust=1701416639523000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPCe44i88PoCFQAAAAAdAAAAABAD&uact=8&ved=2ahUKEwi8t6f_4Z_AAxVVwI8BHf_lBYQ9QF6BAgJEAE&usg=AOvVaw173611T50n_N3pG8D_N5wI",
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fphoto%2F4347220%2F&psig=AOvVaw33a_bF3W8z7h-89c5c8d3F&ust=1701416655389000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCNjG45i88PoCFQAAAAAdAAAAABAD&uact=8&ved=2ahUKEwi11tfi4Z_AAxV_lI8BHQxAGMQ9QF6BAgJEAE&usg=AOvVaw2vM8wX3kO1W0i15V-9k9p3",
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pexels.com%2Fphoto%2F6573796%2F&psig=AOvVaw29-Z2sY2B-bZ9vZ2T96R31&ust=1701416669951000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCPDX9di88PoCFQAAAAAdAAAAABAD&uact=8&ved=2ahUKEwi8_a_r4Z_AAxV3lI8BHVRCZ4Q9QF6BAgJEAE&usg=AOvVaw16Y2xZ23y2w_z3R0631q4Z",
    ];

    const generateEvents = () => {
      const events = [];
      const currentDate = new Date();
      let eventIndex = 0;
      let userIndex = 0;

      for (let i = 40; i > 21; i--) {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);

        events.push({
          title: `Concert Event ${i + 1}`,
          description: `Description for concert event ${i + 1}`,
          date,
          startTime: "8:00 PM",
          endTime: "11:00 PM",
          location: {
            address: "123 Main Street, Cityville",
            latitude: 40.7128,
            longitude: -74.006,
          },
          images: [eventImages[eventIndex]],
          eventOrganizer: "Event Organizer Name",
          likes: [],
          ups: users.slice(userIndex, userIndex + 5),
          comments: comments.slice(userIndex, userIndex + 5),
          notes: "Some notes for the event",
          category: "Music",
        });

        userIndex = (userIndex + 5) % users.length;
        eventIndex = (eventIndex + 1) % eventImages.length;
      }

      return events;
    };

    const events = generateEvents();

    await ConcertEvent.insertMany(events);
    console.log("Sample events inserted successfully");
  } catch (error) {
    console.error("Error seeding events:", error);
    process.exit(1); // Exit with an error code
  }
};
// seedEvents();
