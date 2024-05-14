import { FormControl, TextField, Typography } from "@mui/material";

const EntryForm = () => {
  return (
    <>
      <Typography variant="h6" fontWeight="bold">
        New HealthCheck entry
      </Typography>
      <FormControl>
        <TextField label="Description" type="text" required />
        <Typography>Sick leave</Typography>
        <TextField type="date"></TextField>
      </FormControl>
    </>
  );
};

export default EntryForm;
