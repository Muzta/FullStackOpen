import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients";
import { PatientEntry } from "../types/interfaces";
import { NewPatientEntry, NonSensitivePatientEntry } from "../types/types";

const patients: PatientEntry[] = patientsData as PatientEntry[];

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ ssn: _, ...patient }) => patient);
};

const addEntry = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  return newPatientEntry;
};

export default { getEntries, getNonSensitiveEntries, addEntry };
