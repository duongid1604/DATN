const Order = require('../models/Order');

const orderController = {
  // CREATE ORDER
  createOrder: async (req, res) => {
    const newOrder = new Order(req.body);
    try {
      const savedOrder = await newOrder.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET USER ORDER
  getOrder: async (req, res) => {
    try {
      const orders = await Order.find({ userId: req.params.userId })
        .populate('userId')
        .populate({
          path: 'products',
          populate: { path: 'productID' },
        });
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // GET ALL
  getAll: async (req, res) => {
    try {
      const orders = await Order.find()
        .populate('userId')
        .populate({
          path: 'products',
          populate: { path: 'productID' },
        });
      res.status(200).json(orders);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // UPDATE ORDER
  updateOrder: async (req, res) => {
    try {
      const updatedOrder = await Order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // DELETE ORDER
  deleteOrder: async (req, res) => {
    try {
      await Order.findByIdAndDelete(req.params.id);
      res.status(200).json('Order has been deleted');
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //   MONTLY INCOME
  monthlyIncome: async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    // const previousMonth = new Date(
    //   new Date().setMonth(lastMonth.getMonth() - 1)
    // );
    // console.log('previousMonth', lastMonth, previousMonth);
    try {
      const income = await Order.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
          $project: {
            month: { $month: '$createdAt' },
            sales: '$amount',
          },
        },
        {
          $group: {
            _id: '$month',
            total: { $sum: '$sales' },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};

module.exports = orderController;
