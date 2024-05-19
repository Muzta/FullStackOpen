import { Box, Button, TextField, Typography } from "@mui/material";
import { useField } from "../../../Hooks";
import { EntryWithoutId, SickLeave } from "../../../types";
import { textFieldStyle } from "../../../utils";

interface Props {
  onSubmit: (entry: EntryWithoutId) => void;
}

const OccupationalHealthForm = ({ onSubmit }: Props) => {
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

    onSubmit(entryToAdd);
    handleReset();
  };

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
