import dotenv from "dotenv";
import http from "http";
import connectToDatabase from "./config/database.js";
import app from "./app.js";

dotenv.config();

connectToDatabase();

// Create HTTP server
const server = http.createServer(app);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
