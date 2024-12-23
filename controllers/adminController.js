import { generateAdminToken, authenticateAdmin } from '../services/adminService.js';

export const adminLogin = async (req, res) => {
  console.log('admin login hit');
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required." });
    }
    const isAuthenticated = authenticateAdmin(username, password);
    if (!isAuthenticated) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = generateAdminToken({ "username": username, "role": "admin" });
    return res.status(200).json({ token });
  } catch (error) {
    console.error("Error during admin login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
