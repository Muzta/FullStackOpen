import {
  Box,
  Button,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import { useField } from "../../../Hooks";
import { EntryWithoutId } from "../../../types";

interface Props {
  onSubmit: (entry: EntryWithoutId) => void;
}

const OccupationalHealth = ({ onSubmit }: Props) => {
  const { resetValue: resetDescription, ...description } = useField("text");
  const { resetValue: resetDate, ...date } = useField("date");
  const { resetValue: resetSpecialist, ...specialist } = useField("text");
  const { resetValue: resetEmployerName, ...employerName } = useField("text");
  const { resetValue: resetSickStart, ...sickLeaveStart } = useField("date");
  const { resetValue: resetSickEnd, ...sickLeaveEnd } = useField("date");

  const handleReset = () => {
    resetDescription(),
      resetDate(),
      resetSpecialist(),
      resetEmployerName(),
      resetSickStart(),
      resetSickEnd();
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    console.log("SUBMITTED");
    event.preventDefault();

    const sickLeave = {
      startDate: sickLeaveStart.value,
      endDate: sickLeaveEnd.value,
    };

    const entryToAdd: EntryWithoutId = {
      description: description.value,
      date: date.value,
      specialist: specialist.value,
      type: "OccupationalHealthcare",
      employerName: employerName.value,
      sickLeave: sickLeave,
    };

    onSubmit(entryToAdd);
  };

  const textFieldStyle: TextFieldProps = {
    variant: "standard",
    margin: "dense",
    InputLabelProps: { shrink: true },
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
        <TextField
          label="Employer name"
          {...employerName}
          {...textFieldStyle}
          required
        ></TextField>
        <Typography>Sick leave</Typography>
        <TextField label="Start" {...sickLeaveStart} {...textFieldStyle} />
        <TextField label="End" {...sickLeaveEnd} {...textFieldStyle} />
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

export default OccupationalHealth;
