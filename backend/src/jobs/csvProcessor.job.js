import { Worker } from "bullmq";
import fs from "fs";
import csv from "csv-parser";
import Report from "../models/Report.js";
import Job from "../models/Job.js";
import redis from "../config/redis.js";

new Worker(
  "csvQueue",
  async (job) => {
    const { filePath, jobId } = job.data;

    const jobDoc = await Job.findOne({ jobId });

    jobDoc.status = "PROCESSING";
    await jobDoc.save();

    let processed = 0;
    let failed = 0;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", async (row) => {
        try {
          await Report.findOneAndUpdate(
            { ngoId: row.ngoId, month: row.month },
            row,
            { upsert: true }
          );
          processed++;
        } catch (error) {
          failed++;
        }

        await Job.updateOne(
          { jobId },
          { processedRows: processed, failedRows: failed }
        );
      })
      .on("end", async () => {
        await Job.updateOne({ jobId }, { status: "COMPLETED" });
      });
  },
  { connection: redis }
);
