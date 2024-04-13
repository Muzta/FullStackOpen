import patientsData from "../../data/patients";
import { PatientEntry } from "../types/interfaces";
import { NonSensitivePatientEntry } from "../types/types";

const patients: PatientEntry[] = patientsData as PatientEntry[];

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ ssn: _, ...patient }) => patient);
};

export default { getEntries, getNonSensitiveEntries };
