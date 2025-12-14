import { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/report", {
      ngoId: form.ngoId,
      month: form.month,
      peopleHelped: Number(form.peopleHelped),
      eventsConducted: Number(form.eventsConducted),
      fundsUtilized: Number(form.fundsUtilized),
    });
    alert("Report submitted");

    setForm(initialFormState);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5">Submit Monthly Report</Typography>

      <TextField
        name="ngoId"
        label="NGO ID"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        name="month"
        label="Month (YYYY-MM)"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        name="peopleHelped"
        label="People Helped"
        type="number"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        name="eventsConducted"
        label="Events Conducted"
        type="number"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <TextField
        name="fundsUtilized"
        label="Funds Utilized"
        type="number"
        fullWidth
        margin="normal"
        onChange={handleChange}
      />

      <Button
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Container>
  );
}
