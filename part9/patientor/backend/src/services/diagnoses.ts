import diagnosesData from "../../data/diagnoses";
import { Diagnosis } from "../types/interfaces";

const diagnoses: Diagnosis[] = diagnosesData;

const getEntries = (): Diagnosis[] => {
  return diagnoses;
};

export default { getEntries };
