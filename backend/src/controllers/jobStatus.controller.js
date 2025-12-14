import Job from "../models/Job.js";

export const getJobStatus = async (req, res, next) => {
  try {
    const { jobId } = req.params;

    const job = await Job.findOne({ jobId });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    const progress =
      job.totalRows && job.totalRows > 0
        ? Math.round((job.processedRows / job.totalRows) * 100)
        : 0;

    res.json({
      success: true,
      jobId: job.jobId,
      status: job.status,
      totalRows: job.totalRows || 0,
      processedRows: job.processedRows,
      failedRows: job.failedRows,
      progress,
    });
  } catch (error) {
    next(error);
  }
};
