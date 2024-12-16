const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "password123";

const authenticateAdmin = (username, password) => {
  if (username !== ADMIN_USERNAME) return false;
  return password === ADMIN_PASSWORD;
};

export default {
  authenticateAdmin,
};
