import express from "express";
import { sendOtp,login, verifyOtpHandler,getUser, resetPassword, register, verifyMail } from "../controllers/authController.js";
import verifyToken,{VerifyOtpToken} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/login', login);                  
router.post('/send-otp',sendOtp)                       
router.post('/verify-otp',verifyOtpHandler)              
router.post('/reset-password',VerifyOtpToken,resetPassword)             
router.post('/register',register)           
router.post('/get-profile',verifyToken,getUser)            

export default router;
