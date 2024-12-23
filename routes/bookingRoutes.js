import express from "express";
import { createBooking, getBookings } from "../controllers/bookingController.js";
import { verifyAdminToken } from "../services/adminService.js";
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/",verifyToken, createBooking);
router.get("/", verifyAdminToken,getBookings);

export default router;
