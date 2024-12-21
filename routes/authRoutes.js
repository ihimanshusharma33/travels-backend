import express from "express";
import { sendOtp,login, verifyOtpHandler,getUser, resetPassword, register, verifyMail } from "../controllers/authController.js";
import verifyToken,{VerifyOtpToken} from "../middlewares/authMiddleware.js";
const router = express.Router();

router.post('/login', login);                  
router.post('/send-otp',sendOtp)                         //send otp to mail   -------------------done
router.post('/verify-otp',verifyOtpHandler)              //verify otp  -------------------done
router.post('/reset-password',VerifyOtpToken,resetPassword)             //update password ------------------done
router.post('/register',register)                        //user registration -------------------done
router.post('/verify-mail',verifyMail)                   //for mail verification   ----------------working
router.post('/get-user',verifyToken,getUser)             //get user details     --------------------done


export default router;
