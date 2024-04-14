import { PatientEntry } from "./interfaces";

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;

export type NewPatientEntry = Omit<PatientEntry, "id">;
