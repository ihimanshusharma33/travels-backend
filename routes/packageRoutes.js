import express from "express";
import {
  getPackages,
  createPackage,
  updatePackage,
  deletePackage,
  getPackageById,
} from "../controllers/packageController.js";
import { verifyAdminToken } from "../services/adminService.js";


const router = express.Router();

router.get("/", getPackages);
router.get("/:id", getPackageById);
router.post("/", verifyAdminToken, createPackage);
router.put("/:id", verifyAdminToken, updatePackage);
router.delete("/:id", verifyAdminToken, deletePackage);

export default router;
