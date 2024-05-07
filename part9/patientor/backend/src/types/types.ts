import { Patient } from "./interfaces";

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type NonSensitivePatient = Omit<
  Patient,
  "ssn" | "entries" | "dateOfBirth"
>;

export type NewPatient = Omit<Patient, "id">;
