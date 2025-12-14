import express from "express";
import reportRoutes from "./routes/report.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import jobStatusRoutes from "./routes/jobStatus.routes.js";
import cors from "cors";
import { metricsMiddleware } from "./middlewares/metrics.middleware.js";
const app = express();
app.use(metricsMiddleware);

app.use(express.json());
app.use(cors());

app.use("/api/report", reportRoutes);
app.use("/api/reports", uploadRoutes);
app.use("/api/reports", jobStatusRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);

app.use(errorHandler);

export default app;
