import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients";
import { Patient } from "../types/interfaces";
import {
  EntryWithoutId,
  NewPatient,
  NonSensitivePatient,
} from "../types/types";

const patients: Patient[] = patientsData;

const getEntries = (): Patient[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patients.map(
    ({ ssn: _ssn, entries: _entries, dateOfBirth: _dateOfBirth, ...patient }) =>
      patient
  );
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

const addPatientEntry = (
  entry: EntryWithoutId,
  patientId: string
): Patient | undefined => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };

  const patient = patients.find((patient) => patient.id === patientId);
  patient?.entries.push(newPatientEntry);
  return patient;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById,
  addPatientEntry,
};
