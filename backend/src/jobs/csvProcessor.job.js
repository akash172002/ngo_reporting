import { Worker } from "bullmq";
import fs from "fs";
import csv from "csv-parser";
import Report from "../models/Report.js";
import Job from "../models/Job.js";
import redis from "../config/redis.js";

const worker = new Worker(
  "csvQueue",
  async (job) => {
    const { filePath, jobId } = job.data;

    const jobDoc = await Job.findOne({ jobId });
    if (!jobDoc) throw new Error("Job not found");

    jobDoc.status = "PROCESSING";
    await jobDoc.save();

    let processed = 0;
    let failed = 0;

    await new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath).pipe(csv());

      stream.on("data", async (row) => {
        stream.pause();

        try {
          await Report.findOneAndUpdate(
            { ngoId: row.ngoId, month: row.month },
            {
              ngoId: row.ngoId,
              month: row.month,
              peopleHelped: Number(row.peopleHelped),
              eventsConducted: Number(row.eventsConducted),
              fundsUtilized: Number(row.fundsUtilized),
            },
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

        stream.resume();
      });

      stream.on("end", resolve);
      stream.on("error", reject);
    });

    await Job.updateOne({ jobId }, { status: "COMPLETED" });

    fs.unlink(filePath, () => {});
  },
  {
    connection: redis,
  }
);

export default worker;
