import { Box, Button, TextField, Typography } from "@mui/material";
import { useField } from "../../../Hooks";
import { Discharge, EntryWithoutId } from "../../../types";
import { textFieldStyle } from "../../../utils";

interface Props {
  onSubmit: (entry: EntryWithoutId) => void;
}

const HospitalForm = ({ onSubmit }: Props) => {
  const { resetValue: resetDescription, ...description } = useField("text");
  const { resetValue: resetDate, ...date } = useField("date");
  const { resetValue: resetSpecialist, ...specialist } = useField("text");
  const { resetValue: resetEmployerName, ...employerName } = useField("text");
  const { resetValue: resetDischargeDate, ...dischargeDate } = useField("date");
  const { resetValue: resetDischargeCriteria, ...dischargeCriteria } =
    useField("text");

  const handleReset = () => {
    resetDescription(),
      resetDate(),
      resetSpecialist(),
      resetEmployerName(),
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
        <TextField
          label="Employer name"
          {...employerName}
          {...textFieldStyle}
          required
        ></TextField>
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
