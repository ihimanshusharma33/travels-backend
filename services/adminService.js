const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password123";
import jwt from "jsonwebtoken";

export const authenticateAdmin = (username, password) => {
  if (username !== ADMIN_USERNAME) return false;
  return password === ADMIN_PASSWORD;
};

export const verifyAdminToken = (req, res, next) => {
  const token = req.headers["token"];
  if (!token) {
    return res.status(403).json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.username !== ADMIN_USERNAME && decoded.role !== "admin") {
      return res.status(403).json({ message: "Invalid token" });
    }
    console.log('admin verified');
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
export const generateAdminToken = () => {
  return jwt.sign({ username: ADMIN_USERNAME, role: "admin", role: "admin" }, process.env.JWT_SECRET, { expiresIn: "1h", });
}

