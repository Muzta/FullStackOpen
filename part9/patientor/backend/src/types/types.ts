import { PatientEntry } from "./interfaces";

export type Gender = "male" | "female" | "other";

export type NonSensitivePatientEntry = Omit<PatientEntry, "ssn">;
