import { User } from "../models/userSchema.js";
import { Message } from "../models/message.js";
import { Room } from "../models/room.js";

export const addMessage = async function (req, res) {
  console.log("req.body", req.body);
  const { userId, content, roomId, media } = req.body;
  let file;
  try {
    // console.log("====================================");
    // console.log(userId, content, roomId, media, req.file.filename);
    // console.log("====================================");
    // res.send("hello");
    if (["image", "video", "pdf", "audio"].includes(media)) {
      file = req.file.filename;
    }
    const room = await Room.findById(roomId);

    if (!room) {
      // console.log("Couldn't find room", roo);
      return res.status(400).json({ error: "Room not found" });
    }
    if (!room.users.includes(userId)) {
      // console.log("Couldn't find room", roo);
      return res.status(400).json({ error: "User is not exist in room" });
    }
    console.log("fileeeeeeeeeeeeeeee", req.file);
    const messages = await Message.create({
      media: media,
      sender: userId,
      message: file ? file : content,
      room: roomId,
    });

    const updatedRoom = await Room.findByIdAndUpdate(roomId, {
      $push: { messages: messages._id },
    });
    return res.status(200).send({ messages, updatedRoom });
  } catch (error) {
    throw error;
  }
};
export const removeMessage = async function (req, res) {
  try {
    const messages = await Message.findByIdAndDelete(req.params.id);

    res.status(200).send(messages);
  } catch (error) {
    throw error;
  }
};
export const getAllMessages = async function (req, res) {
  try {
    const messages = await Message.find({
      room: req.params.roomId,
    }).populate({
      path: "sender",
      model: "User",
    });
    res.status(200).send(messages);
  } catch (error) {
    throw error;
  }
};
export const getUsersTobeConnection = async function (req, res) {
  try {
    const userId = req.user._id;
    const page = parseInt(req.params.page) || 1; // Get page number, default to 1
    const limit = parseInt(req.params.limit) || 3; // Items per page, default to 10
    // Find the current user and populate their rooms
    const currentUser = await User.findById(userId).populate("rooms").exec();
    if (!currentUser) {
      throw new Error("User not found");
    }

    // Get all room IDs that the current user is part of
    const roomIds = currentUser.rooms.map((room) => room._id);

    // Find users who are not in any of these rooms
    const usersWithoutCommonRooms = await User.find({
      _id: { $ne: userId }, // Exclude the current user
      // status: { $nin: ["Pending", "Rejected"] },

      rooms: { $nin: roomIds }, // Users not in any of the current user's rooms
    })
      .sort({ createdAt: 1 }) // Sort by the indexed field
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const totalUsers = await User.find({
      _id: { $ne: userId }, // Exclude the current user
      // status: { $nin: ["Pending", "Rejected"] },

      rooms: { $nin: roomIds }, // Users not in any of the current user's rooms
    });
    res.send({
      usersWithoutCommonRooms,
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers.length / limit),
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const getUsersConnections = async function (req, res) {
  try {
    const userId = req.user._id;
    const page = parseInt(req.params.page) || 1; // Get page number, default to 1
    const limit = parseInt(req.params.limit) || 3; // Items per page, default to 10
    // Find the user and populate their rooms
    // const totalUsers = await User.countDocuments();
    const currentUser = await User.findById(userId).populate("rooms").exec();
    if (!currentUser) {
      return res.status(404).send("user not found");
    }

    // Get all room IDs that the current user is part of
    const roomIds = currentUser.rooms.map((room) => room._id);

    // Find other users who are in any of these rooms
    const usersWithCommonRooms = await User.find({
      _id: { $ne: userId }, // Exclude the current user
      rooms: { $in: roomIds },
      // status: { $ne: 'pending' }
    })
      // .sort({ createdAt: 1 }) // Sort by the indexed field
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    const totalUsers = await User.find({
      _id: { $ne: userId }, // Exclude the current user
      rooms: { $in: roomIds },
      // status: { $ne: 'pending' }
    });
    res.send({
      usersWithCommonRooms,
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers.length / limit),
    });
  } catch (error) {
    throw error;
  }
};
export const getAllRoomByUserId = async function (req, res) {
  try {
    const rooms = await User.findById(req.params.userId).populate({
      path: "rooms",
      populate: {
        path: "messages",
        model: "MessageNote",
        populate: {
          path: "sender",
          model: "User",
        },
      },
    });
    res.status(200).send(rooms);
  } catch (error) {
    throw error;
  }
};

export const createRoom = async function (req, res) {
  const user2 = req.user._id;
  const { user1 } = req.params;

  try {
    const commonRooms = await Room.findOne({
      users: {
        $all: [req.params.user1, req.params.user2],
        $size: 2,
      },
    });

    // console.log("commonRooms", commonRooms);
    if (commonRooms !== null) {
      return res.status(400).json({ error: "Room  exists" });
    } else {
      const rommsCreate = await Room.create({
        users: [user1, user2],
      });
      const result = await User.updateMany(
        { _id: { $in: rommsCreate.users } },
        { $push: { rooms: rommsCreate._id } }
      );
      res.status(200).json(rommsCreate);
    }
  } catch (error) {
    throw error;
  }
};
export const getAllMessagesByRoomId = async () => {};
// export default s;
