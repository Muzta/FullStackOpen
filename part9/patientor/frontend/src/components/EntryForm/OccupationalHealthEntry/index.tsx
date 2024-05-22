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
import { useField, useMultipleSelectField } from "../../../Hooks";
import { Diagnosis, EntryWithoutId, SickLeave } from "../../../types";
import { textFieldStyle } from "../../../utils";

interface Props {
  onSubmit: (entry: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}

const OccupationalHealthForm = ({ onSubmit, diagnoses }: Props) => {
  const { resetValue: resetDescription, ...description } = useField("text");
  const { resetValue: resetDate, ...date } = useField("date");
  const { resetValue: resetSpecialist, ...specialist } = useField("text");
  const { resetValue: resetDiagnosisCodes, ...diagnosisCodes } =
    useMultipleSelectField();
  const { resetValue: resetEmployerName, ...employerName } = useField("text");
  const { resetValue: resetSickStart, ...sickLeaveStart } = useField("date");
  const { resetValue: resetSickEnd, ...sickLeaveEnd } = useField("date");

  const handleReset = () => {
    resetDescription(),
      resetDate(),
      resetSpecialist(),
      resetDiagnosisCodes(),
      resetEmployerName(),
      resetSickStart(),
      resetSickEnd();
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const entryToAdd: EntryWithoutId = {
      description: description.value,
      date: date.value,
      specialist: specialist.value,
      type: "OccupationalHealthcare",
      employerName: employerName.value,
    };

    // Add sickLeave conditionally
    if (
      sickLeaveStart.value.trim() !== "" &&
      sickLeaveEnd.value.trim() !== ""
    ) {
      const sickLeave: SickLeave = {
        startDate: sickLeaveStart.value,
        endDate: sickLeaveEnd.value,
      };

      entryToAdd.sickLeave = sickLeave;
    }

    if (diagnosisCodes.value && diagnosisCodes.value.length > 0)
      entryToAdd.diagnosisCodes = diagnosisCodes.value;

    onSubmit(entryToAdd);
    handleReset();
  };

  // If a input field of the sick leave is filledInputClasses, the other is required
  const requiredSickLeave =
    sickLeaveStart.value.trim().length > 0 ||
    sickLeaveEnd.value.trim().length > 0;

  return (
    <>
      <Typography variant="h6" fontWeight="bold">
        New Occupational Healthcare entry
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

        <TextField
          label="Employer name"
          {...employerName}
          {...textFieldStyle}
          required
        ></TextField>
        <Typography>Sick leave</Typography>
        <TextField
          label="Start"
          {...sickLeaveStart}
          {...textFieldStyle}
          required={requiredSickLeave}
        />
        <TextField
          label="End"
          {...sickLeaveEnd}
          {...textFieldStyle}
          required={requiredSickLeave}
        />
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

export default OccupationalHealthForm;
