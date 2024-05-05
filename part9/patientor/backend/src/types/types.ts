import { Patient } from "./interfaces";

export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}

export type NonSensitivePatient = Omit<Patient, "ssn" | "entries">;

export type NewPatient = Omit<Patient, "id">;
