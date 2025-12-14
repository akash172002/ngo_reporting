import express from "express";
import { getJobStatus } from "../controllers/jobStatus.controller.js";

const router = express.Router();

router.get("/job-status/:jobId", getJobStatus);

export default router;
