import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { EntryWithoutId } from "../../types";
import HospitalForm from "./HospitalEntry";
import OccupationalHealthForm from "./OccupationalHealthEntry";
import HealthCheckForm from "./HealthCheckEntry";

interface Props {
  onSubmit: (entry: EntryWithoutId) => void;
}

const EntryForm = ({ onSubmit }: Props) => {
  const [selectedType, setSelectedType] = useState("");
  let selectedComponent;

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value);
  };

  switch (selectedType) {
    case "Occupational":
      selectedComponent = <OccupationalHealthForm onSubmit={onSubmit} />;
      break;
    case "Hospital":
      selectedComponent = <HospitalForm onSubmit={onSubmit} />;
      break;
    case "HealthCheck":
      selectedComponent = <HealthCheckForm onSubmit={onSubmit} />;
      break;
    default:
      selectedComponent = null;
  }

  return (
    <>
      <Select
        displayEmpty
        value={selectedType}
        onChange={handleTypeChange}
        inputProps={{ "aria-label": "Without label" }}
      >
        <MenuItem disabled value="">
          <em>New Entry type</em>
        </MenuItem>
        <MenuItem value="Occupational">Occupational Healthcare</MenuItem>
        <MenuItem value="Hospital">Hospital</MenuItem>
        <MenuItem value="HealthCheck">Health Check</MenuItem>
      </Select>

      {selectedComponent}
    </>
  );
};

export default EntryForm;
