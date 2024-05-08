import { Box, Typography } from "@mui/material";
import { Diagnosis, Entry } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalEntry";
import DiagnosesDetails from "../DiagnosesDetails";

interface Props {
  entry: Entry;
  diagnoses: Diagnosis[];
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry, diagnoses }: Props) => {
  let entryTypeComponent, entryDiagnosesComponent;

  switch (entry.type) {
    case "HealthCheck":
      entryTypeComponent = <HealthCheckEntry entry={entry} />;
      break;
    case "Hospital":
      entryTypeComponent = <HospitalEntry entry={entry} />;
      break;
    case "OccupationalHealthcare":
      entryTypeComponent = <OccupationalHealthcareEntry entry={entry} />;
      break;
    default:
      return assertNever(entry);
  }

  if (entry.diagnosisCodes)
    entryDiagnosesComponent = (
      <DiagnosesDetails codes={entry.diagnosisCodes} diagnoses={diagnoses} />
    );

  return (
    <Box
      border="2px solid"
      borderRadius="5px"
      marginBlockStart="1rem"
      padding="0.5rem"
    >
      {entryTypeComponent}
      {entryDiagnosesComponent}
      <Typography>Diagnose by {entry.specialist}</Typography>
    </Box>
  );
};

export default EntryDetails;
