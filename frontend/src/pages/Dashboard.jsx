import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
  Pagination,
  Box,
} from "@mui/material";
import api from "../api/api";

export default function Dashboard() {
  const [month, setMonth] = useState("");
  const [ngoId, setNgoId] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);

  const LIMIT = 5;

  const fetchData = async (pageNumber = 1) => {
    try {
      setError("");

      const res = await api.get(
        `/dashboard?month=${month}&ngoId=${ngoId}&page=${pageNumber}&limit=${LIMIT}`
      );

      setData(res.data);
      setPage(pageNumber);
    } catch (err) {
      setError("Failed to load dashboard data. Please login again.", err);
    }
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Filters */}
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <TextField
          label="Month (YYYY-MM)"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <TextField
          label="NGO ID (optional)"
          value={ngoId}
          onChange={(e) => setNgoId(e.target.value)}
        />

        <Button
          variant="contained"
          onClick={() => fetchData(1)}
          disabled={!month}
        >
          Load
        </Button>
      </Box>

      {/* Error */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {/* Summary Cards */}
      {data?.summary && (
        <Grid container spacing={2} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography>Total NGOs Reporting</Typography>
                <Typography variant="h4">
                  {data.summary.totalNGOs || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography>People Helped</Typography>
                <Typography variant="h4">
                  {data.summary.peopleHelped || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography>Events Conducted</Typography>
                <Typography variant="h4">
                  {data.summary.eventsConducted || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography>Funds Utilized</Typography>
                <Typography variant="h4">
                  {data.summary.fundsUtilized || 0}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}

      {data?.data?.length > 0 && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <Pagination
            page={page}
            onChange={(e, value) => fetchData(value)}
            count={Math.ceil(data.data.length / LIMIT) + 1}
            color="primary"
          />
        </Box>
      )}
    </Container>
  );
}
