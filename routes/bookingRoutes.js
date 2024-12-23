import express from "express";
import { createBooking, getBookings } from "../controllers/bookingController.js";
import { verifyAdminToken } from "../services/adminService.js";

const router = express.Router();

router.post("/", createBooking);
router.get("/", verifyAdminToken,getBookings);

export default router;
