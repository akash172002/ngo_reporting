import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import api from "../api/api";

const initialFormState = {
  ngoId: "",
  month: "",
  peopleHelped: "",
  eventsConducted: "",
  fundsUtilized: "",
};

export default function SubmitReport() {
  const [form, setForm] = useState(initialFormState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/report", {
        ngoId: form.ngoId,
        month: form.month,
        peopleHelped: Number(form.peopleHelped),
        eventsConducted: Number(form.eventsConducted),
        fundsUtilized: Number(form.fundsUtilized),
      });

      alert("Report submitted");
      setForm(initialFormState);
    } catch (err) {
      alert("Failed to submit report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Container maxWidth="sm">
        <Typography variant="h5">Submit Monthly Report</Typography>

        <TextField
          name="ngoId"
          label="NGO ID"
          fullWidth
          margin="normal"
          value={form.ngoId}
          onChange={handleChange}
          disabled={loading}
        />

        <TextField
          name="month"
          label="Month (YYYY-MM)"
          fullWidth
          margin="normal"
          value={form.month}
          onChange={handleChange}
          disabled={loading}
        />

        <TextField
          name="peopleHelped"
          label="People Helped"
          type="number"
          fullWidth
          margin="normal"
          value={form.peopleHelped}
          onChange={handleChange}
          disabled={loading}
        />

        <TextField
          name="eventsConducted"
          label="Events Conducted"
          type="number"
          fullWidth
          margin="normal"
          value={form.eventsConducted}
          onChange={handleChange}
          disabled={loading}
        />

        <TextField
          name="fundsUtilized"
          label="Funds Utilized"
          type="number"
          fullWidth
          margin="normal"
          value={form.fundsUtilized}
          onChange={handleChange}
          disabled={loading}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </Button>
      </Container>
    </>
  );
}
