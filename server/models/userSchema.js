import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: [3, "votre Prenom Doit Contenir Au Moins 3 Caracters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Cotre Nom Doit Contenir Au Moins 3 Caractères!"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Entrez un Email Valide SVP !"],
  },
  phone: {
    type: String,
    required: true,
    minLength: [
      8,
      "Votre Numéro De Téléphone Doit Contenir Exactement 8 Chiffre!",
    ],
    maxLength: [
      8,
      "Votre Numéro De Téléphone Doit Contenir Exactement 8 Chiffre!",
    ],
  },

  password: {
    type: String,
    required: true,
    minLength: [8, "Votre Mot De Passe Doit Contenir Au Moins 8 Caracters !"],
    select: false,
  },

  genre: {
    type: String,
    required: true,
    enum: ["Homme", "Femme"],
  },
  levelEnglish: {
    type: String,
    enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
  },
  role: {
    type: String,
    required: true,
    enum: ["Admin", "Student"],
  },
  isLoggedIn: { 
    type: Boolean, default: false
   },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
  },

  studentAvatar: {
    type: String,
    required: true,
    default: `http://localhost:4000/uploads/6d90f194-62e6-414a-8095-ec9348e109de.jpg`,
  },

  rooms: [{ type: ObjectId, ref: "Room" }],
  description: {
    type: String,
  },
  github: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  about: {
    type: String,
  },
});
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePassword = async function (entredPassword) {
  return await bcrypt.compare(entredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};
// Create an index on the createdAt field for efficient sorting
userSchema.index({ createdAt: 1 });

// Alternatively, you can create a compound index for pagination
userSchema.index({ createdAt: 1, _id: 1 });
export const User = mongoose.model("User", userSchema);
const photos = [
  "http://localhost:4000/uploads/6d90f194-62e6-414a-8095-ec9348e109de.jpg",
  "http://localhost:4000/uploads/a2c7690e-ee45-4286-b04c-21c03bac2a9b.jpg",
  // Add more photo URLs as needed
];

const getRandomPhoto = (photos) => {
  const randomIndex = Math.floor(Math.random() * photos.length);
  return photos[randomIndex];
};

// const updateUsersWithRandomPhotos = async () => {
//   try {
//     const users = await User.find();
//     const updatePromises = users.map((user) => {
//       const randomPhoto = getRandomPhoto(photos);
//       return User.updateOne({ _id: user._id }, { studentAvatar: randomPhoto });
//     });

//     await Promise.all(updatePromises);

//     console.log("All users updated with random photos");
//   } catch (error) {
//     console.error("Error updating users:", error);
//   } finally {
//     mongoose.connection.close();
//   }
// };

// updateUsersWithRandomPhotos();
