import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;
const CommentSchema = new mongoose.Schema({
  message: { type: String },
  sender: { type: ObjectId, ref: "User", required: true },
  createdAt: { type: Date, default: Date.now },
  event: { type: ObjectId, ref: "ConcertEvent", required: true },
  media: {
    type: String,
  },
});

export const Comment = mongoose.model("Comment", CommentSchema);
const seedComments = async () => {
  try {
    const userIds = [
      "66ed86dc8a96ec169b2f9af3",
      "66eec6525bc694e12e1120be",
      "66eec6525bc694e12e1120bf",
    ];

    const eventIds = [
      "66ef28ca3d7a15f119583a07",
      "66ef28ca3d7a15f119583a08",
      "66ef28ca3d7a15f119583a09",
    ];

    const comments = [
      {
        message: "This event looks amazing! Can't wait to go!",
        sender: userIds[0],
        event: eventIds[0],
        media:
          "https://static01.nyt.com/images/2020/03/13/arts/13listings-jazz/13listings-jazz-mediumSquareAt3X.jpg", // Optional image URL
      },
      {
        message: "I'm already planning my outfit for this festival!",
        sender: userIds[1],
        event: eventIds[1],
      },
      {
        message: "I'm already planning my outfit for this festival!",
        sender: userIds[2],
        event: eventIds[1],
      },
      {
        message: "I'm already planning my outfit for this festival!",
        sender: userIds[1],
        event: eventIds[1],
      },
      {
        message: "What are the ticket prices for this concert?",
        sender: userIds[2],
        event: eventIds[2],
        media:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQyOy86zb-5pSjr_uWD4W35iZ2Ez3TxlT6HA&s", // Optional image URL
      },
      {
        message: "What are the ticket prices for this concert?",
        sender: userIds[1],
        event: eventIds[2],
        media:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQyOy86zb-5pSjr_uWD4W35iZ2Ez3TxlT6HA&s", // Optional image URL
      },
      // ... add more comments as needed ...
    ];

    await Comment.insertMany(comments);
    console.log("Sample comments inserted successfully");
  } catch (error) {
    console.error("Error seeding comments:", error);
    process.exit(1); // Exit with an error code
  }
};

// seedComments();
