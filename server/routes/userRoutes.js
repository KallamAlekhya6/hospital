import express from 'express';
import { getAllDoctors } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/doctors', protect, getAllDoctors);

export default router;
