import express from "express";

import {
  registerAdmin,
  loginAdmin,
  getCurrentAdmin,
} from "../controllers/admin.controller.js";
import { adminAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// only for once
router.post("/register", registerAdmin);

router.post("/login", loginAdmin);

router.get("/me", adminAuth, getCurrentAdmin);

export default router;
