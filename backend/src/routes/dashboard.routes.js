import express from "express";
import { getDashboard } from "../controllers/dashboard.controller.js";
import { adminAuth } from "../middlewares/auth.middleware.js";

const router = express.Router();
router.get("/", adminAuth, getDashboard);

export default router;
