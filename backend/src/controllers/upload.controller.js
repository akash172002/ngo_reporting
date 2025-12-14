import { Queue } from "bullmq";
import Job from "../models/Job.js";
import { v4 as uuidv4 } from "uuid";
import redis from "../config/redis.js";
import fs from "fs";
import csv from "csv-parser";

const csvQueue = new Queue("csvQueue", { connection: redis });

export const uploadCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "CSV file is required" });
    }

    const jobId = uuidv4();
    await Job.create({
      jobId,
      status: "PENDING",
      processedRows: 0,
      failedRows: 0,
      totalRows: 0,
    });

    let totalRows = 0;
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on("data", () => {
        totalRows++;
      })
      .on("end", async () => {
        await Job.updateOne({ jobId }, { totalRows });
      });

    await csvQueue.add("processCSV", {
      filePath: req.file.path,
      jobId,
    });

    res.status(202).json({
      message: "CSV upload started",
      jobId,
    });
  } catch (error) {
    next(error);
  }
};
