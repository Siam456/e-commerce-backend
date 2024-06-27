const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  getOrderById,
  getOrderByUser,
  updateOrder,
  deleteOrder,
  updateOrderLabel
} = require('../controller/orderController');

//get all orders
router.get('/', getAllOrders);

//get all order by a user
router.get('/user/:id', getOrderByUser);

//get a order by id
router.get('/:id', getOrderById);

//update a order
router.put('/:id', updateOrder);

//update a order label
router.put('/label/:id', updateOrderLabel);

//delete a order
router.delete('/:id', deleteOrder);

module.exports = router;
