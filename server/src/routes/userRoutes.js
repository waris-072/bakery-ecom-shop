import express from "express";
import { getCustomersController, deleteCustomerController  } from "../controllers/userController.js";
import { isAuthenticated, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get( "/customers", isAuthenticated, isAdmin, getCustomersController );
router.delete( "/:id", isAuthenticated, isAdmin, deleteCustomerController );


export default router;