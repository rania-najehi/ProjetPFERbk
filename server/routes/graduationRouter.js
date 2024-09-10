import express from 'express';
import { createGraduation, getGraduations, getGraduationById, updateGraduation, deleteGraduation } from '../controllers/graduationController.js';
const router = express.Router();

router.post('/graduations', createGraduation);
router.get('/graduations', getGraduations);
router.get('/graduations/:id', getGraduationById);
router.put('/graduations/:id', updateGraduation);
router.delete('/graduations/:id', deleteGraduation);

export default router;