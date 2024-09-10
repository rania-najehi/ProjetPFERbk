import express from "express";
import {
  updateUserCv,
  studentRegister,
  getAllStudent,
  getUserDetails,
  login,
  logoutAdmin,
  logoutStudent,
  avatarStudent,
  getStudentCount,
  updateStudent,
  getPendingStudents,
  updateStudentStatus,
  getAcceptedStudents,
  getUserProfile,
  getLoggedInStudents,
  adminLogin,
} from "../controllers/userController.js";
import { addNewAdmin } from "../controllers/userController.js";
import {
  isStudentAuthenticated,
  isAdminAuthenticated,
} from "../middlewares/auth.js";
import { upload } from "../middlewares/multer.js";
const router = express.Router();
router.post("/student/register", upload.single("file"), studentRegister);
router.put("/update/:id", updateStudent);
router.put(
  "/updateCv",
  isStudentAuthenticated,
  upload.single("file"),
  updateUserCv
);

router.post("/login", login);
// Route pour la connexion de l'administrateur
router.route('/admin/login').post(adminLogin);
router.post("/admin/addNew", isAdminAuthenticated, addNewAdmin);
router.get("/student/getStudent", isAdminAuthenticated, getAllStudent);
router.get("/admin/me", isAdminAuthenticated, getUserDetails);
router.get("/student/me", isStudentAuthenticated, getUserDetails);
router.get("/admin/logout", isAdminAuthenticated, logoutAdmin);
router.get("/student/logout", isStudentAuthenticated, logoutStudent);
router.post("/student/addInformation", isAdminAuthenticated, avatarStudent);
router.get("/count", getStudentCount);
router.route('/profile').get(isStudentAuthenticated, getUserProfile);
//admin get user logged in
router.route('/loggedin-students').get(isAdminAuthenticated, getLoggedInStudents);
// Route pour obtenir les étudiants en attente
router.get("/students/pending", isAdminAuthenticated, getPendingStudents);
// Route pour mettre à jour le statut d'un étudiant
router.put(
  "/student/update-status/:id",
  isAdminAuthenticated,
  updateStudentStatus
);
router.get("/students/accepted", isAdminAuthenticated, getAcceptedStudents);

export default router;
