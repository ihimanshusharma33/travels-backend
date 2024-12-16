import express from "express";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  getPackageById,
} from "../controllers/packageController.js";
import verifyAdmin from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getPackages);
router.get("/:id", getPackageById);
router.post("/", verifyAdmin, createPackage);
router.put("/:id", verifyAdmin, updatePackage);
router.delete("/:id", verifyAdmin, deletePackage);

export default router;
