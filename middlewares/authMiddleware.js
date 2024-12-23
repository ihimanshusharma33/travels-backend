import jwt from "jsonwebtoken";
import { findUserByEmail, verifyPassword } from "../services/authService.js";
const verifyToken = async(req, res, next) => {
  const token = req.headers['token'];
  if (!token) {
    return res
      .status(403)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, password } = decoded;
    const isValidUser= await findUserByEmail(email);
    if(!isValidUser){
      return res.status(403).json({ message: "Invalid token" });
    }
    const isValidPassword= await verifyPassword(password,isValidUser.password);
    if(isValidPassword){
      req.user = decoded;
      next();
    }
  }
  catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
export const VerifyOtpToken = async(req, res, next) => {
  const token = req.headers['otptoken'];
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, otp } = decoded;
    console.log('decoded email and otp',decoded);
    const isValidUser= await findUserByEmail(email);
    console.log('checking is user a Valid User',isValidUser);
    if(!isValidUser){
      return res.status(403).json({ message: "Invalid token" });
    }
    console.log('User Verified');
    next();
  }
  catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

export default verifyToken;
