import express from 'express'
import Product from '../models/productModel.js'
import {
    getAllProducts,
    getProductById
} from '../controllers/productsController.js';

const router = express.Router();

// CREATE
// router.post('/create-hotel', createHotel)
    // GET All
router.get('/', getAllProducts)
    // GET BY ID
router.get('/:id', getProductById)
    // UPDATE
// router.put('/update-hotel/:id', updateHotel)
    // DELETE
// router.delete('/delete/:id', deleteHotel)

export default router