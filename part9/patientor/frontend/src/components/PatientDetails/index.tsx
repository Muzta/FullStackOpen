import { Box, Icon, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import patientService from "../../services/patients";
import { Diagnosis, Gender, Patient } from "../../types";
import DiagnosesDetails from "../DiagnosesDetails";

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
      try {
        if (id) {
          const patient = await patientService.getById(id);
          setPatient(patient);
        }
      } catch (error) {
        console.error(`Error fetching patient ${id}:`, error);
      }
    };

    fetchPatient();
  }, [match]);

  if (!patient) return <Typography variant="h6">Patient not found</Typography>;

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
      {patient.entries.length > 0 && (
        <>
          <Typography variant="h6">Entries</Typography>
          {Object.values(patient.entries).map((entry) => (
            <Box key={entry.id}>
              <Typography paragraph>
                {entry.date} <i>{entry.description}</i>
              </Typography>

              {entry.diagnosisCodes && (
                <DiagnosesDetails
                  codes={entry.diagnosisCodes}
                  diagnoses={diagnoses}
                />
              )}
            </Box>
          ))}
        </>
      )}
    </>
  );
};

export default PatientDetails;
