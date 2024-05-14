import { Box, Icon, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnosis, EntryWithoutId, Gender, Patient } from "../../types";
import EntryDetails from "../EntryDetails";
import OccupationalHealth from "../EntryForm/OccupationalHealthEntry";

interface Props {
  diagnoses: Diagnosis[];
}

const PatientDetails = ({ diagnoses }: Props) => {
  const [patient, setPatient] = useState<Patient | undefined>();
  const match = useMatch("/:id");

  // Fetch all patient info
  useEffect(() => {
    if (!match) return;

    const fetchPatient = async () => {
      const id = match.params.id;
      if (id) {
        try {
          const patient = await patientService.getById(id);
          setPatient(patient);
        } catch (error) {
          console.error(`Error fetching patient ${id}:`, error);
        }
      }
    };

    fetchPatient();
  }, [match]);

  if (!patient) return <Typography variant="h6">Patient not found</Typography>;

  const createEntry = async (entry: EntryWithoutId) => {
    const id = match?.params.id;
    if (id) {
      try {
        await patientService.createEntry(id, entry);
      } catch (error: unknown) {
        console.error(error);
      }
    }
  };

  let genderIcon;
  switch (patient.gender) {
    case Gender.Male:
      genderIcon = <Icon>male</Icon>;
      break;
    case Gender.Female:
      genderIcon = <Icon>female</Icon>;
      break;
    default:
      genderIcon = <Icon>question_mark</Icon>;
  }

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        {patient.name} {genderIcon}
      </Typography>
      <Typography paragraph>ssn: {patient.ssn}</Typography>
      <Typography paragraph>occupation: {patient.occupation}</Typography>
      <OccupationalHealth onSubmit={createEntry} />
      {patient.entries.length > 0 && (
        <>
          <Typography variant="h6">Entries</Typography>
          {Object.values(patient.entries).map((entry) => (
            <Box key={entry.id}>
              <EntryDetails diagnoses={diagnoses} entry={entry} />
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default PatientDetails;
