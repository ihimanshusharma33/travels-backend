import User from "../models/User.js";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
const otpStore = {}; // Temporary OTP store (replace with a database in production)
import Otp from "../models/Otp.js";
import dotenv from "dotenv";

dotenv.config();
export const findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const generateJwtToken = (user, secret, expiresIn) => {
  return jwt.sign(user, secret, { expiresIn });
};

export const generateOtp = (email) => {
  const otp = Math.floor(100000 + Math.random() * 900000);
  otpStore[email] = otp;
  return otp;
};

export const sendOtpToEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP is ${otp}\n\n Do not share this OTP with anyone`,
  });
  const newOtp = new Otp({ email: email, otp: otp, createdAt: Date.now() });
  await newOtp.save();
};

export const verifyOtp = async (email, otp) => {
  try {
    const data = await Otp.findOne({ email, otp }); // Await the database query
    return !!data; // Return true if data exists, false otherwise
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return false; // Return false in case of an error
  }
};

export const clearOtp = (email) => {
  console.log('clearing otp');
};

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};


export const updateUserPassword = async (email, newPassword) => {
  const hashedPassword = await hashPassword(newPassword);
  return await User.findOneAndUpdate({ email }, { password: hashedPassword });
};


export const createUser = async (userData) => {
  const isUserExist = await User.find({ email: userData.email })
  if (isUserExist.length > 0) {
    return 0;
  }
  const hashedPassword = await hashPassword(userData.password);
  const newUser = new User({ ...userData, password: hashedPassword });
  return await newUser.save();
};

export const verifyUserEmail = async (email) => {
  return await User.findOneAndUpdate({ email }, { isMailVerified: true });
};
