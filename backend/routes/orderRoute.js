import express from "express";
import authUser from "../middleware/auth.js";

import { placeOrder, userOrders, allOrders } from "../controllers/orderController.js";



const orderRouter = express.Router();

orderRouter.post("/place", authUser, placeOrder);
orderRouter.post("/userorders", authUser, userOrders);
orderRouter.post("/list", allOrders);

export default orderRouter;