import express from "express";

import { createOrderController, getMyOrdersController, getAllOrdersController, }from "../controllers/orderController.js";

import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isAuthenticated, createOrderController);
router.get("/my-orders", isAuthenticated, getMyOrdersController);
router.get("/", isAuthenticated, isAdmin, getAllOrdersController);

export default router;