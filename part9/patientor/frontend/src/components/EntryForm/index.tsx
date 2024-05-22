import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { Diagnosis, EntryWithoutId } from "../../types";
import HospitalForm from "./HospitalEntry";
import OccupationalHealthForm from "./OccupationalHealthEntry";
import HealthCheckForm from "./HealthCheckEntry";

interface Props {
  onSubmit: (entry: EntryWithoutId) => void;
  diagnoses: Diagnosis[];
}

const EntryForm = ({ onSubmit, diagnoses }: Props) => {
  const [selectedType, setSelectedType] = useState("");
  let selectedComponent;

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value);
  };

  switch (selectedType) {
    case "Occupational":
      selectedComponent = (
        <OccupationalHealthForm onSubmit={onSubmit} diagnoses={diagnoses} />
      );
      break;
    case "Hospital":
      selectedComponent = (
        <HospitalForm onSubmit={onSubmit} diagnoses={diagnoses} />
      );
      break;
    case "HealthCheck":
      selectedComponent = (
        <HealthCheckForm onSubmit={onSubmit} diagnoses={diagnoses} />
      );
      break;
    default:
      selectedComponent = null;
  }

  return (
    <div
      style={{ display: "flex", border: "2px dotted black", padding: "2rem" }}
    >
      <FormControl fullWidth>
        <InputLabel id="entry-form-type">New Entry Form</InputLabel>
        <Select
          labelId="entry-form-type"
          value={selectedType}
          onChange={handleTypeChange}
          input={<OutlinedInput label="New Entry Form" />}
        >
          <MenuItem value="Occupational">Occupational Healthcare</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="HealthCheck">Health Check</MenuItem>
        </Select>

        {selectedComponent}
      </FormControl>
    </div>
  );
};

export default EntryForm;
