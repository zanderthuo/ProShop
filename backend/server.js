import express from 'express';
import products from './data/products.js';
import cors from 'cors';
import dotenv from 'dotenv'
import colors from 'colors'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

// routes
import productRouter from './routes/ProductRoutes.js'
import userRouter from './routes/UserRoutes.js'
import orderRouter from './routes/OrderRoutes.js'

dotenv.config()

// connecting to db
connectDB()

const app = express();

// middlewares
app.use(cors())
app.use(express.json())
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))