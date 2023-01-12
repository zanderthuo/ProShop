import express from 'express'
import Order from '../models/orderModel.js'
import {
  addOrderItems
} from '../controllers/ORDERController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(protect, addOrderItems)

export default router