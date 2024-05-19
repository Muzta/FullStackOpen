import { v1 as uuid } from "uuid";
import patientsData from "../../data/patients";
import { Entry, Patient } from "../types/interfaces";
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

const addPatientEntry = (entry: EntryWithoutId, patientId: string): Entry => {
  const newPatientEntry: Entry = {
    id: uuid(),
    ...entry,
  };

  const patient = patients.find((patient) => patient.id === patientId);

  if (!patient) throw new Error(`Patient with id ${patientId} not found`);
  patient.entries = [...patient.entries, newPatientEntry];

  return newPatientEntry;
};

export default {
  getEntries,
  getNonSensitiveEntries,
  addEntry,
  findById,
  addPatientEntry,
};
