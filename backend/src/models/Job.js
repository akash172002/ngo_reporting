import mongoose from "mongoose";
const jobSchema = new mongoose.Schema(
  {
    jobId: String,
    totalRows: Number,
    processedRows: {
      type: Number,
      default: 0,
    },
    failedRows: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ["PENDING", "PROCESSING", "COMPILETED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Job", jobSchema);
