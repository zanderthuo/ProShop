import Order from '../models/orderModel.js';

// @desc  Create new order
// @route POST /api/orders
// @access Private
export const addOrderItems = async(req, res, next) => {
  try {
      const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
      } = req.body

      if(orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No Order Items')
      } else {
        const order = new Order({
          orderItems,
          user: req.user._id,
          shippingAddress,
          paymentMethod,
          itemsPrice,
          taxPrice,
          shippingPrice,
          totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
      }
      
      // // if query successfully send status code is 200
      res.status(200).json(products);
  } catch (err) {
      // if any error return send status code 500
      next(err)
  }
}