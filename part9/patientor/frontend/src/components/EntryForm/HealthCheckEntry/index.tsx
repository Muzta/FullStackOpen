import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useField, useSelectField } from "../../../Hooks";
import { healthCheckRatingEntries } from "../../../utils";
import { textFieldStyle } from "../../../utils";
import { EntryWithoutId, HealthCheckRating } from "../../../types";

interface Props {
  onSubmit: (entry: EntryWithoutId) => void;
}

const HealthCheckForm = ({ onSubmit }: Props) => {
  const { resetValue: resetDescription, ...description } = useField("text");
  const { resetValue: resetDate, ...date } = useField("date");
  const { resetValue: resetSpecialist, ...specialist } = useField("text");
  const { resetValue: resetHealthCheckRating, ...healthCheckRating } =
    useSelectField();

  const handleReset = () => {
    resetDescription(),
      resetDate(),
      resetSpecialist(),
      resetHealthCheckRating();
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const healthCheckRatingValue = Number(healthCheckRating.value);
    if (!Object.values(HealthCheckRating).includes(healthCheckRatingValue)) {
      throw new Error("Invalid health check rating");
    }

    const entryToAdd: EntryWithoutId = {
      description: description.value,
      date: date.value,
      specialist: specialist.value,
      type: "HealthCheck",
      healthCheckRating: healthCheckRatingValue,
    };

    onSubmit(entryToAdd);
    handleReset();
  };

  return (
    <>
      <Typography variant="h6" fontWeight="bold">
        New HealthCheck entry
      </Typography>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          label="Description"
          {...description}
          {...textFieldStyle}
          required
        />
        <TextField label="Date" {...date} {...textFieldStyle} required />
        <TextField
          label="Specialist"
          {...specialist}
          {...textFieldStyle}
          required
        />

        <Select
          displayEmpty
          value={healthCheckRating.value}
          onChange={healthCheckRating.onChange}
          inputProps={{ "aria-label": "Without label" }}
          required
        >
          <MenuItem disabled value="">
            <em>Health Check Rating</em>
          </MenuItem>
          {healthCheckRatingEntries.map(([key, value]) => (
            <MenuItem key={key} value={value}>
              {key}
            </MenuItem>
          ))}
        </Select>

        <Box style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="secondary" onClick={handleReset}>
            Cancel
          </Button>
          <Button variant="outlined" type="submit">
            Create entry
          </Button>
        </Box>
      </form>
    </>
  );
};

export default HealthCheckForm;
