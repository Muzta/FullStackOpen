import {
  BaseEntryWithoutId,
  Diagnosis,
  Discharge,
  Entry,
  SickLeave,
} from "./src/types/interfaces";
import {
  EntryWithoutId,
  Gender,
  HealthCheckRating,
  NewPatient,
} from "./src/types/types";

const isString = (text: unknown): text is string => {
  return (
    (typeof text === "string" || text instanceof String) &&
    text.trim().length > 0
  );
};

const isNumber = (num: unknown): num is number => {
  return !isNaN(num as number);
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

// Patient entries utils
const isHealthCheckRating = (rating: number): rating is HealthCheckRating => {
  return Object.values(HealthCheckRating)
    .map((r) => Number(r))
    .includes(Number(rating));
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis["code"]> => {
  if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
    // We will just trust the data to be in correct form
    return [] as Array<Diagnosis["code"]>;
  }

  return object.diagnosisCodes as Array<Diagnosis["code"]>;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description))
    throw new Error("Incorrect or missing description");
  return description;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!isString(specialist)) throw new Error("Incorrect or missing specialist");
  return specialist;
};

const parseType = (type: unknown): string => {
  if (!isString(type)) throw new Error(`Incorrect or missing type: ${type}`);
  return type;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName))
    throw new Error(`Incorrect or missing employer name: ${employerName}`);
  return employerName;
};

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria))
    throw new Error(`Incorrect or missing criteria in discharge: ${criteria}`);
  return criteria;
};

const parseDischarge = (dischargeParam: unknown): Discharge => {
  if (!dischargeParam || typeof dischargeParam !== "object")
    throw new Error(`Incorrect or missing discharge: ${dischargeParam}`);
  if (!("date" in dischargeParam) || !("criteria" in dischargeParam))
    throw new Error("Incorrect data: some fields are missing");

  const discharge: Discharge = {
    date: parseDate(dischargeParam.date),
    criteria: parseCriteria(dischargeParam.criteria),
  };

  return discharge;
};

const parseSickLeave = (sickLeaveParam: unknown): SickLeave => {
  if (!sickLeaveParam || typeof sickLeaveParam !== "object")
    throw new Error(`Incorrect or missing sick leave: ${sickLeaveParam}`);
  if (!("startDate" in sickLeaveParam) || !("endDate" in sickLeaveParam))
    throw new Error("Incorrect data: some fields are missing");

  const sickLeave: SickLeave = {
    startDate: parseDate(sickLeaveParam.startDate),
    endDate: parseDate(sickLeaveParam.endDate),
  };

  return sickLeave;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isNumber(rating) || !isHealthCheckRating(rating))
    throw new Error(`Incorrect or missing health check rating: ${rating}`);
  return rating;
};

const toNewEntry = (object: unknown): EntryWithoutId => {
  if (!object || typeof object !== "object")
    throw new Error("Incorrect or missing data");
  if (
    !("description" in object) ||
    !("date" in object) ||
    !("specialist" in object) ||
    !("type" in object)
  )
    throw new Error("Incorrect data: some fields are missing");

  const type = parseType(object.type);

  const commonProperties: BaseEntryWithoutId = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes:
      "diagnosisCodes" in object
        ? parseDiagnosisCodes(object.diagnosisCodes)
        : undefined,
  };

  switch (type) {
    case "OccupationalHealthcare":
      if (!("employerName" in object))
        throw new Error("Incorrect data: some fields are missing");

      return {
        ...commonProperties,
        type: type,
        employerName: parseEmployerName(object.employerName),
        sickLeave:
          "sickLeave" in object ? parseSickLeave(object.sickLeave) : undefined,
      };

    case "Hospital":
      if (!("discharge" in object))
        throw new Error("Incorrect data: some fields are missing");

      return {
        ...commonProperties,
        type: type,
        discharge: parseDischarge(object.discharge),
      };

    case "HealthCheck":
      if (!("healthCheckRating" in object))
        throw new Error("Incorrect data: some fields are missing");

      return {
        ...commonProperties,
        type: type,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };

    default:
      throw new Error(`Unhandled entry type: ${JSON.stringify(object)}`);
  }
};

export { toNewPatientEntry, toNewDiagnosisEntry, toNewEntry };
