import express from 'express';
import products from './data/products.js';
import cors from 'cors';

const app = express();

app.get('/', (req, res) => {
  res.send('API is running')
})

app.get('/api/products', (req, res) => {
  res.json(products)
})

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id)
  res.json(product)
})

// middlewares
app.use(cors())

app.listen(5000, console.log('Server running on port 5000'))