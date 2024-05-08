import { Diagnosis, Entry } from "./src/types/interfaces";
import { Gender, NewPatient } from "./src/types/types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Patient entry utils
const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((g) => g.toString())
    .includes(gender);
};

const isEntry = (entry: unknown): entry is Entry => {
  if (!entry || typeof entry !== "object")
    throw new Error("Incorrect or missing data");
  return true;
};

const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error("Incorrect or missing name");
  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date))
    throw new Error(`Incorrect or missing date: ${date}`);
  return date;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn)) throw new Error("Incorrect or missing ssn");
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error("Incorrect or missing occupation");
  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error(`Incorrect or missing gender: ${gender}`);
  return gender;
};

const parseEntries = (entries: unknown): Entry[] => {
  if (!Array.isArray(entries) || !entries.every((entry) => isEntry(entry)))
    throw new Error("Incorrect or missing entries");
  return entries as Entry[];
};

const toNewPatientEntry = (object: unknown): NewPatient => {
  if (!object || typeof object !== "object")
    throw new Error("Incorrect or missing data");
  if (
    !("name" in object) ||
    !("dateOfBirth" in object) ||
    !("ssn" in object) ||
    !("occupation" in object) ||
    !("gender" in object) ||
    !("entries" in object)
  )
    throw new Error("Incorrect data: some fields are missing");

  const newEntry: NewPatient = {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    occupation: parseOccupation(object.occupation),
    gender: parseGender(object.gender),
    entries: parseEntries(object.entries),
  };

  return newEntry;
};

// Diagnosis entry utils
const parseCode = (code: unknown): string => {
  if (!isString(code)) throw new Error("Incorrect or missing code");
  return code;
};

const parseLatin = (latin: unknown): string => {
  if (!isString(latin)) throw new Error("Incorrect latin");
  return latin;
};

const toNewDiagnosisEntry = (object: unknown): Diagnosis => {
  if (!object || typeof object !== "object")
    throw new Error("Incorrect or missing data");
  if (!("code" in object) || !("name" in object))
    throw new Error("Incorrect data: some fields are missing");

  const newDiagnosis: Diagnosis = {
    code: parseCode(object.code),
    name: parseName(object.name),
    latin: "latin" in object ? parseLatin(object.latin) : undefined,
  };

  return newDiagnosis;
};

export { toNewPatientEntry, toNewDiagnosisEntry };
