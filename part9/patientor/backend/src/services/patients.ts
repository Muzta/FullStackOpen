import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients";
import { Patient } from "../types/interfaces";
import { NewPatient, NonSensitivePatient } from "../types/types";

const patients: Patient[] = patientsData as Patient[];

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(({ ssn: _, entries: _unused, ...patient }) => patient);
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  return patient;
};

const addEntry = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getEntries, getNonSensitiveEntries, addEntry, findById };
