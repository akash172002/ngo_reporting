import app from "./app.js";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import "./jobs/csvProcessor.job.js";

dotenv.config();
const PORT = process.env.PORT || 5000;

connectDb();

app.listen(PORT, () => {
  console.log(`Server is running on PORT : ${PORT}`);
});
