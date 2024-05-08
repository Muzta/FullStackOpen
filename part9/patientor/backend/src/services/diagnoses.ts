import diagnosesData from "../../data/diagnoses";
import { Diagnosis } from "../types/interfaces";

const diagnoses: Diagnosis[] = diagnosesData;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

const addEntry = (diagnosis: Diagnosis) => {
  diagnoses.push(diagnosis);
  return diagnosis;
};

export default { getEntries, addEntry };
