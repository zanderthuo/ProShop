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


// @desc  Get order by ID
// @route GET /api/orders/:id
// @access Private
export const getOrderById = async(req, res, next) => {
  try {
      const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
      )

      if (order) {
        res.json(order)
      } else {
        res.status(404)
        throw new Error('Order not found')
      }
      
      // // if query successfully send status code is 200
      // res.status(200)
  } catch (err) {
      // if any error return send status code 500
      next(err)
  }
}

// @desc  Update order to paid
// @route Put /api/orders/:id/pay
// @access Private
export const updateOrderToPaid = async(req, res, next) => {
  try {
      const order = await Order.findById(req.params.id)

      if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
          id: req.body.id,
          status: req.body.status,
          update_time: req.body.update_time,
          email_address: req.body.payer.email_address
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
      } else {
        res.status(404)
        throw new Error('Order not found')
      }
      
      // // if query successfully send status code is 200
      // res.status(200)
  } catch (err) {
      // if any error return send status code 500
      next(err)
  }
}

// @desc  Get logged in user orders
// @route Put /api/orders/myorders
// @access Private
export const getMyOrders = async(req, res, next) => {
  try {
      const orders = await Order.find({ user: req.user._id })
      res.json(orders)
      // // if query successfully send status code is 200
      // res.status(200)
  } catch (err) {
      // if any error return send status code 500
      next(err)
  }
}