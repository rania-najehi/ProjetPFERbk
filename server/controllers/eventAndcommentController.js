import { Comment } from "../models/comment.js";
import { User } from "../models/userSchema.js";

import ConcertEvent from "../models/events.js";
export const getAllSubscribedEvents = async (req, res) => {
  try {
    const { eventId, page, limit } = req.params;
    const event = await ConcertEvent.findById(eventId).exec();
    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    const totalSubscribers = event.ups.length;
    const subscribers = await ConcertEvent.findById(eventId)
      .populate({
        path: "ups",
        model: "User",
        select:
          "firstName lastName email phone genre levelEnglish studentAvatar", // Select specific fields to return
        options: {
          skip: (page - 1) * limit,
          limit: limit,
        },
      })
      .exec();
    const events = await ConcertEvent.findById(eventId)
      .populate({
        path: "ups",
        model: "User",
        select:
          "firstName lastName email phone genre levelEnglish studentAvatar", // Select specific fields to return
        options: {
          skip: (page - 1) * limit,
          limit: limit,
        },
      })
      .exec();
    res.json({
      ups: subscribers.ups,
      currentPage: page,
      totalPages: Math.ceil(totalSubscribers / limit),
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
export const getAllLikedEvents = async (req, res) => {
  try {
    const { eventId, page, limit } = req.params;
    const events = await ConcertEvent.findOne({ _id: eventId }).populate({
      path: "likes",
      model: "User",
      select: "firstName lastName email phone genre levelEnglish studentAvatar", // Select specific fields to return

      options: {
        skip: (page - 1) * limit,
        limit: limit,
      },
    });

    res.send({
      likes: events.likes.slice((page - 1) * limit, limit),
      currentPage: page,
      totalPages: Math.ceil(events.likes.length / limit),
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
export const getAllCommentsByEventId = async (req, res) => {
  try {
    const { eventId, page, limit } = req.params;

    const comments = await Comment.find({ event: eventId })
      .populate("sender")
      .skip((page - 1) * limit)
      .limit(limit);
    res.json({
      comments,
      currentPage: page,
      totalPages: Math.ceil(comments.length / limit),
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const getAllevent = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const { date, subscribed } = req.query;
  const userId = req.user._id;
  console.log(userId, "userId");

  console.log(req.query);

  try {
    const query = {};

    if (date) {
      // Parse the date string
      const parsedDate = new Date(date);
      // Use $gte and $lte to filter events on the same day
      query.date = {
        $gte: new Date(
          parsedDate.getFullYear(),
          parsedDate.getMonth(),
          parsedDate.getDate()
        ),
        $lte: new Date(
          parsedDate.getFullYear(),
          parsedDate.getMonth(),
          parsedDate.getDate(),
          23,
          59,
          59,
          999
        ),
      };
    }
    console.log(typeof subscribed);

    if (subscribed === "true" && userId) {
      query.ups = { $in: [userId] };
    }

    const eventsCounts = await ConcertEvent.find(query);

    // Apply the query to the main find
    const events = await ConcertEvent.find(query)

      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "sender",
          model: "User",
          select: "firstName lastName studentAvatar",
        },
      })
      .populate({
        path: "ups",
        model: "User",
        select: "firstName lastName studentAvatar",
      })
      .populate({
        path: "likes",
        model: "User",
        select: "firstName lastName studentAvatar",
      })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    res.send({
      events,
      currentPage: page,
      totalPages: Math.ceil(eventsCounts.length / limit),
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};
export const addComment = async (req, res) => {
  try {
    const { message, event } = req.body;
    let media;
    const userId = req.user._id;
    let newComment;
    if (req.file) media = req.file.filename;
    console.log("comment", {
      message,
      event,
      sender: userId,
      media,
    });
    if (media) {
      newComment = await Comment.create({
        message,
        event,
        sender: userId,
        media,
      });
    } else {
      newComment = await Comment.create({
        message,
        event,
        sender: userId,
      });
    }

    const getComment = await Comment.findOne({
      _id: newComment._id,
    }).populate("sender");

    const updatedEvent = await ConcertEvent.findByIdAndUpdate(
      event,
      { $push: { comments: newComment._id } },
      { new: true }
    );

    res.status(201).json(getComment);
  } catch (error) {
    res.status(500).json({ error: "Failed to create comment" });
  }
};

// PUT /users/:userId/likes/:eventId
export const updateLike = async (req, res) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.eventId;

    const user = await User.findById(userId);
    const event = await ConcertEvent.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ error: "User or event not found" });
    }

    if (user.likes.includes(eventId)) {
      // Remove like
      await User.findByIdAndUpdate(userId, { $pull: { likes: eventId } });
      await ConcertEvent.findByIdAndUpdate(eventId, {
        $pull: { likes: userId },
      });
    } else {
      // Add like
      await User.findByIdAndUpdate(userId, { $push: { likes: eventId } });
      await ConcertEvent.findByIdAndUpdate(eventId, {
        $push: { likes: userId },
      });
    }

    // Fetch the updated event
    const updatedEvent = await ConcertEvent.findById(eventId)
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "sender",
          model: "User",
          select: "firstName lastName studentAvatar", // Select only specific fields from User
        },
      })

      .exec();

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Failed to update likes" });
  }
};

// PUT /users/:userId/ups/:eventId
export const updateUps = async (req, res) => {
  try {
    const userId = req.user._id;
    const eventId = req.params.eventId;

    const user = await User.findById(userId);
    const event = await ConcertEvent.findById(eventId);

    if (!user || !event) {
      return res.status(404).json({ error: "User or event not found" });
    }

    if (user.ups.includes(eventId)) {
      // Remove like
      await User.findByIdAndUpdate(userId, { $pull: { ups: eventId } });
      await ConcertEvent.findByIdAndUpdate(eventId, { $pull: { ups: userId } });
    } else {
      // Add like
      await User.findByIdAndUpdate(userId, { $push: { ups: eventId } });
      await ConcertEvent.findByIdAndUpdate(eventId, { $push: { ups: userId } });
    }

    // Fetch the updated event
    const updatedEvent = await ConcertEvent.findById(eventId)
      .populate({
        path: "comments",
        model: "Comment",
        populate: {
          path: "sender",
          model: "User",
          select: "firstName lastName studentAvatar", // Select only specific fields from User
        },
      })

      .exec();

    res.status(200).json(updatedEvent);
  } catch (error) {
    console.error("Error updating likes:", error);
    res.status(500).json({ error: "Failed to update likes" });
  }
};
export const filterByDateAndUps = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req.user.id;

    const query = {};
    if (date) {
      query.date = new Date(date); // Convert the query date to a Date object
    }
    if (userId) {
      query.subscribers = { $in: [userId] }; // Match events where the user is subscribed
    }

    const events = await Event.find(query);
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Failed to fetch events" });
  }
};
