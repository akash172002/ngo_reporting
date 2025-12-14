import { useState } from "react";
import {
  Container,
  Typography,
  Button,
  LinearProgress,
  Box,
} from "@mui/material";
import api from "../api/api";

export default function UploadCSV() {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await api.post("/reports/upload", formData);
    pollStatus(res.data.jobId);
  };

  const pollStatus = (jobId) => {
    const interval = setInterval(async () => {
      const res = await api.get(`/reports/job-status/${jobId}`);
      setProgress(res.data);

      if (res.data.status === "COMPLETED") {
        clearInterval(interval);
      }
    }, 2000);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5">Bulk CSV Upload</Typography>

      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" component="label">
          Select CSV
          <input
            type="file"
            hidden
            onChange={(e) => setFile(e.target.files[0])}
          />
        </Button>

        <Button
          sx={{ ml: 2 }}
          variant="contained"
          onClick={upload}
          disabled={!file}
        >
          Upload
        </Button>
      </Box>

      {progress && (
        <Box sx={{ mt: 3 }}>
          <LinearProgress variant="determinate" value={progress.progress} />
          <Typography sx={{ mt: 1 }}>
            Processed {progress.processedRows} of {progress.totalRows} rows
          </Typography>
        </Box>
      )}
    </Container>
  );
}
