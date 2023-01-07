import Product from '../models/productModel.js';

// @desc  Get All Products
// @route GET /api/products
// @access Public
export const getAllProducts = async(req, res, next) => {
  try {
      const products = await Product.find();
      
      // // if query successfully send status code is 200
      res.status(200).json(products);
  } catch (err) {
      // if any error return send status code 500
      next(err)
  }
}


// @desc  Fetch Single Product
// @route GET /api/products/:id  
// @access Public
export const getProductById = async(req, res, next) => {
  try {
      const product = await Product.findById(req.params.id);
      // if query successfully send status code is 200
      res.status(200).json(product);
  } catch (err) {
      // if any error return send status code 500
      res.status(404)
      throw new Error('Product not found')
  }
}