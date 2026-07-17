import orderModel from "../models/orderModel.js";

// ================= PLACE ORDER (COD) =================

const placeOrder = async (req, res) => {
  try {

    const { userId, items, amount, address } = req.body;

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    res.json({
      success: true,
      message: "Order Placed",
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ================= USER ORDERS =================

const userOrders = async (req, res) => {
  try {

    const { userId } = req.body;

    const orders = await orderModel.find({ userId });

    res.json({
      success: true,
      orders,
    });

  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Orders (Admin)
const allOrders = async (req, res) => {
  try {

    const orders = await orderModel.find({});

    res.json({
      success: true,
      orders,
    });

  } catch (error) {

    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });

  }
};

export { placeOrder, userOrders, allOrders };