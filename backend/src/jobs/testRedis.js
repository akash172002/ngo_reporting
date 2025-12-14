import { Queue, Worker } from "bullmq";
import redis from "../config/redis.js";

const queue = new Queue("testQueue", { connection: redis });

await queue.add("test-job", { msg: "Hello Redis" });

new Worker(
  "testQueue",
  async (job) => {
    console.log("✅ Job received:", job.data);
  },
  { connection: redis }
);
