import { Appointment } from "../models/appointmentSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userSchema.js";

const forbiddenTimes = {
  1: ["10:00", "14:00"], // Lundi
  2: ["10:00", "14:00"], // Mardi
  3: ["10:00", "14:00"], // Mercredi
  4: ["10:00", "14:00"], // Jeudi
};

const isForbiddenTime = (appointmentDate) => {
  const date = new Date(appointmentDate);
  const day = date.getUTCDay();
  const time = date.toISOString().split("T")[1].substring(0, 5);

  return forbiddenTimes[day] && forbiddenTimes[day].includes(time);
};

export const postAppointment = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    address,
    phone,
    level,
    genre,
    appointment_date,
    hasVisited,
  } = req.body;

  if (
    !firstName ||
    !lastName ||
    !email ||
    !address ||
    !phone ||
    !genre ||
    !appointment_date ||
    !level
  ) {
    return next(new ErrorHandler("Veuillez remplir tout les champs SVP!", 400));
  }

  // Vérifier si la date et l'heure du rendez-vous sont interdites
  if (isForbiddenTime(appointment_date)) {
    return next(
      new ErrorHandler("Rendez-vous non autorisé à cette date et heure!", 400)
    );
  }

  const studentId = req.user._id;

  // Vérifier si l'utilisateur a déjà un rendez-vous à la même date
  const existingAppointment = await Appointment.findOne({
    studentId,
    appointment_date,
  });
  if (existingAppointment) {
    return next(
      new ErrorHandler("Vous avez déjà un rendez-vous ce jour-là!", 400)
    );
  }

  const appointment = await Appointment.create({
    firstName,
    lastName,
    email,
    address,
    phone,
    genre,
    levelEnglish: level,
    appointment_date,
    hasVisited,
    studentId,
  });
  res.status(200).json({
    success: true,
    message: "Rendez-Vous a été envoyé avec succès!",
    appointment,
  });
});

export const getDisabledDates = catchAsyncErrors(async (req, res, next) => {
  const appointments = await Appointment.find();
  const disabledDates = appointments.map(
    (app) => app.appointment_date.toISOString().split("T")[0]
  );

  res.status(200).json({
    success: true,
    disabledDates,
  });
});

export const getAllAppointment = catchAsyncErrors(async (req, res, next) => {
  const allAppointment = await Appointment.find();
  res.status(200).json({
    success: true,
    allAppointment,
  });
});

export const updateAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  let appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Rendez-vous n'existe pas", 400));
  }
  appointment = await Appointment.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Rendez-vous a été modifié!",
  });
});

export const deleteAppointment = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const appointment = await Appointment.findById(id);
  if (!appointment) {
    return next(new ErrorHandler("Rendez-vous n'existe pas!", 404));
  }
  await appointment.deleteOne();
  res.status(200).json({
    success: true,
    message: "Rendez-vous est supprimé !",
  });
});
