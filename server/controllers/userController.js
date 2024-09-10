import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler, {
  errorMiddleware,
} from "../middlewares/errorMiddleware.js";
import { generateToken } from "../utils/jwtToken.js";
import { User } from "../models/userSchema.js";

export const studentRegister = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, genre, levelEnglish } =
    req.body;
  const image = req.file.filename;
  console.log("FormData fields:", image);
  for (const [key, value] of Object.entries(req.body)) {
    console.log(`${key}: ${value}`);
  }
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !genre ||
    !levelEnglish
  ) {
    return next(new ErrorHandler("Remplir tous les champs SVP", 400));
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    levelEnglish,
    password,
    genre,
    role: "Student",
    studentAvatar: image,
    status: "Pending", // Définit le statut par défaut à "Pending"
  });

  res.status(201).json({
    success: true,
    message: "Client enregistré",
    user,
  });
});




// controllers/userController.js

export const getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

// Fonction pour obtenir les étudiants en attente
export const getPendingStudents = catchAsyncErrors(async (req, res, next) => {
  const pendingStudents = await User.find({
    status: "Pending",
    role: "Student",
  });

  res.status(200).json({
    success: true,
    pendingStudents,
  });
});
// Fonction pour mettre à jour le statut d'un étudiant
export const updateStudentStatus = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!["Pending", "Accepted", "Rejected"].includes(status)) {
    return next(new ErrorHandler("Statut invalide", 400));
  }

  const student = await User.findByIdAndUpdate(id, { status }, { new: true });

  if (!student) {
    return next(new ErrorHandler("Étudiant non trouvé", 404));
  }

  res.status(200).json({
    success: true,
    student,
  });
});

export const getAcceptedStudents = async (req, res) => {
  try {
    const acceptedStudents = await User.find({
      status: "Accepted",
      role: "Student",
    });

    res.status(200).json({
      success: true,
      count: acceptedStudents.length,
      data: acceptedStudents,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
// update Student
export const updateStudent = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, genre, levelEnglish } =
    req.body;

  // Vérifiez que l'utilisateur existe
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHandler("Utilisateur non trouvé", 404));
  }

  // Mettre à jour les champs de l'utilisateur
  user.firstName = firstName || user.firstName;
  user.lastName = lastName || user.lastName;
  user.email = email || user.email;
  user.phone = phone || user.phone;
  user.password = password || user.password;
  user.genre = genre || user.genre;
  user.levelEnglish = levelEnglish || user.levelEnglish;

  // Mettre à jour l'image si un nouveau fichier est téléversé
  if (req.file) {
    user.studentAvatar = req.file.filename;
  }

  // Sauvegarder les modifications
  await user.save();

  res.status(200).json({
    success: true,
    message: "Informations mises à jour avec succès",
    user,
  });
});
// Fonction de connexion pour les administrateurs
export const adminLogin = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Veuillez fournir tous les détails.", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Email ou mot de passe invalide.", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Email ou mot de passe invalide!", 400));
  }

  if (user.role !== "Admin") {
    return next(new ErrorHandler("Seuls les administrateurs peuvent se connecter ici!", 403));
  }

  generateToken(user, "L'administrateur a été connecté avec succès!", 201, res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Veuillez fournir tous les détails.", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Mot De Passe Or Email Invalides.", 400));
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Mot De Passe Or Email Invalides!", 400));
  }

  if (role !== user.role) {
    return next(new ErrorHandler("Role inconuue!", 400));
  }

  user.isLoggedIn = true; // Set isLoggedIn to true
  await user.save();

  generateToken(user, "User has been logged in successfully!", 201, res);
});


export const getLoggedInStudents = catchAsyncErrors(async (req, res, next) => {
  const loggedInStudents = await User.find({ role: "Student", isLoggedIn: true });
  res.status(200).json({
    success: true,
    count: loggedInStudents.length,
    data: loggedInStudents,
  });
});



export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, phone, password, genre } = req.body;
  if (!firstName || !lastName || !email || !phone || !password || !genre) {
    return next(new ErrorHandler("Remplir tout les champs SVP", 400));
  }
  const isRegistred = await User.findOne({ email });
  if (isRegistred) {
    return next(
      new ErrorHandler(
        `${isRegistred.role} à étè déja enregistré par cet e-mail  !`
      )
    );
  }
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    genre,
    role: "Admin",
  });
  res.status(200).json({
    success: true,
    message: "La nouvelle admin a été enregistrée. ",
    admin,
  });
});
export const getAllStudent = catchAsyncErrors(async (req, res, next) => {
  const student = await User.find({ role: "Student" });
  res.status(200).json({
    success: true,
    student,
  });
});

export const getStudentCount = catchAsyncErrors(async (req, res, next) => {
  const studentCount = await User.countDocuments({ role: "Student" });
  res.status(200).json({
    success: true,
    studentCount,
  });
});
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const logoutAdmin = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("adminToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Admin est déconnecté avec succès ",
    });
});

export const avatarStudent = catchAsyncErrors(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Photo de profile est obligatoire!", 400));
  }
  const { studentAvatar } = req.files;
  const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedFormats.includes(studentAvatar.mimetype)) {
    return next(
      new ErrorHandler("le format du ficher ne correspond pas!", 400)
    );
  }
  const { firstName, lastName, email, phone, password } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !password ||
    !studentAvatar
  ) {
    return next(
      new ErrorHandler("veuillez remplir tous les formulaire SVP!", 400)
    );
  }
  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("Cet email est déjà utilisé par cet utilisateur!", 400)
    );
  }
  const cloudinaryResponse = await cloudinary.uploader.upload(
    studentAvatar.tempFilePath
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse.error || "Unknown Cloudinary error"
    );
    return next(
      new ErrorHandler("Impossible de télècharger une image de coudinary ", 500)
    );
  }
  const student = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password,
    role: "Student",

    studentAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });
  res.status(200).json({
    success: true,
    message: "Enregistrement avec succès",
    student,
  });
});

export const logoutStudent = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("studentToken", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "L'utisateur est déconnecté avec succès. ",
    });
});
export const updateUserCv = catchAsyncErrors(async (req, res, next) => {
  let studentAvatar;
  console.log();
  if (req.file) {
    studentAvatar = req.file.filename;
  }
  const update = await User.updateOne(
    { _id: req.user._id },
    { ...req.body, studentAvatar }
  );

  res.status(200).json({
    success: true,
    message: "Informations mises à jour avec succès",
    update,
  });
});
