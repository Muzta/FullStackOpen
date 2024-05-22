import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  useField,
  useMultipleSelectField,
  useSelectField,
} from "../../../Hooks";
import { Diagnosis, EntryWithoutId, HealthCheckRating } from "../../../types";
import { healthCheckRatingEntries, textFieldStyle } from "../../../utils";

interface Props {
  onSubmit: (entry: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}

const HealthCheckForm = ({ onSubmit, diagnoses }: Props) => {
  const { resetValue: resetDescription, ...description } = useField("text");
  const { resetValue: resetDate, ...date } = useField("date");
  const { resetValue: resetSpecialist, ...specialist } = useField("text");
  const { resetValue: resetDiagnosisCodes, ...diagnosisCodes } =
    useMultipleSelectField();
  const { resetValue: resetHealthCheckRating, ...healthCheckRating } =
    useSelectField();

  const handleReset = () => {
    resetDescription(),
      resetDate(),
      resetSpecialist(),
      resetHealthCheckRating(),
      resetDiagnosisCodes();
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

    if (diagnosisCodes.value && diagnosisCodes.value.length > 0)
      entryToAdd.diagnosisCodes = diagnosisCodes.value;

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
        <FormControl fullWidth>
          <InputLabel id="diagnosis-codes">Diagnosis codes</InputLabel>
          <Select
            labelId="diagnosis-codes"
            multiple
            value={diagnosisCodes.value}
            onChange={diagnosisCodes.onChange}
            input={<OutlinedInput label="Diagnosis codes" />}
          >
            {diagnoses.map((diagnosis) => (
              <MenuItem key={diagnosis.code} value={diagnosis.code}>
                {diagnosis.code}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required>
          <InputLabel id="health-check-form">Health Check rating</InputLabel>
          <Select
            labelId="health-check-form"
            value={healthCheckRating.value}
            onChange={healthCheckRating.onChange}
            input={<OutlinedInput label="Health Check rating" />}
          >
            {healthCheckRatingEntries.map(([key, value]) => (
              <MenuItem key={key} value={value}>
                {key}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

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
