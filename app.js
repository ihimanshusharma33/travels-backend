import express from "express";
import cors from "cors";

import { packageRoutes, bookingRoutes, adminRoutes } from "./routes/index.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/packages", packageRoutes);
app.use("/bookings", bookingRoutes);
app.use("/admin", adminRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

export default app;
