import express from "express";
import { createProductController, getProductsController, getProductController, updateProductController, deleteProductController } from "../controllers/productController.js";

import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post( "/", isAuthenticated, isAdmin, upload.single("image"), createProductController );
router.get("/", getProductsController);
router.get("/:id", getProductController);
router.put("/:id", isAuthenticated, isAdmin, upload.single("image"), updateProductController);
router.delete("/:id", isAuthenticated, isAdmin, upload.single("image"), deleteProductController);


export default router;