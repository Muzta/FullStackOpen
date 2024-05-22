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
import { Diagnosis, Discharge, EntryWithoutId } from "../../../types";
import { textFieldStyle } from "../../../utils";

interface Props {
  onSubmit: (entry: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}

const HospitalForm = ({ onSubmit, diagnoses }: Props) => {
  const { resetValue: resetDescription, ...description } = useField("text");
  const { resetValue: resetDate, ...date } = useField("date");
  const { resetValue: resetSpecialist, ...specialist } = useField("text");
  const { resetValue: resetDiagnosisCodes, ...diagnosisCodes } =
    useMultipleSelectField();
  const { resetValue: resetDischargeDate, ...dischargeDate } = useField("date");
  const { resetValue: resetDischargeCriteria, ...dischargeCriteria } =
    useField("text");

  const handleReset = () => {
    resetDescription(),
      resetDate(),
      resetSpecialist(),
      resetDiagnosisCodes(),
      resetDischargeDate(),
      resetDischargeCriteria();
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const discharge: Discharge = {
      date: dischargeDate.value,
      criteria: dischargeCriteria.value,
    };

    const entryToAdd: EntryWithoutId = {
      description: description.value,
      date: date.value,
      specialist: specialist.value,
      type: "Hospital",
      discharge: discharge,
    };

    if (diagnosisCodes.value && diagnosisCodes.value.length > 0)
      entryToAdd.diagnosisCodes = diagnosisCodes.value;

    onSubmit(entryToAdd);
    handleReset();
  };

  return (
    <>
      <Typography variant="h6" fontWeight="bold">
        New Hospital entry
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

        <Typography>Discharge</Typography>
        <TextField
          label="Date"
          {...dischargeDate}
          {...textFieldStyle}
          required
        />
        <TextField
          label="Criteria"
          {...dischargeCriteria}
          {...textFieldStyle}
          required
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

export default HospitalForm;
