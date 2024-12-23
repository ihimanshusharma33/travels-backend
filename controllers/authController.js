import {findUserByEmail, verifyPassword, generateJwtToken, generateOtp, sendOtpToEmail, verifyOtp,clearOtp,updateUserPassword,createUser,  verifyUserEmail} from "../services/authService.js";
import { configDotenv } from "dotenv";
configDotenv();

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });
    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });
    const token = generateJwtToken({ email: email, password: password }, process.env.JWT_SECRET, "1h");
    res.status(200).json({ token: token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const sendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const otp = generateOtp(email);
    await sendOtpToEmail(email, otp);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP", error });
  }
};

export const verifyOtpHandler = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }
  const isOtpValid = await verifyOtp(email, otp);
  const token = generateJwtToken({ email: email, otp: otp }, process.env.JWT_SECRET, "1h");
  if (isOtpValid) {
    return res.status(200).json({ message: "OTP verified successfully", otpToken: token });
  } else {
    return res.status(400).json({ message: "Invalid OTP" });
  }
};
// reset password
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  // Check if email, newPassword, and token are provided
  if (!email || !newPassword) {
    return res.status(400).json({ message: "Email, new password, and token are required" });
  }
  try {
    // Update the user's password
    await updateUserPassword(email, newPassword);
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to reset password", error });
  }
};

export const register = async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ message: "phone ,name,email or password is missing" });
  }
  try {
    const result = await createUser({ name, email, phone, password });
    if (!result) {
      return res.status(403).json({ message: "User already exists" });
    }
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to register user", error });
  }
};

export const verifyMail = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await verifyUserEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to verify email", error });
  }
};

export const getUser = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }
  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to get user", error });
  }
}