import diagnosesData from "../../data/diagnoses";
import { DiagnosisEntry } from "../types/interfaces";

const diagnoses: DiagnosisEntry[] = diagnosesData;

const getEntries = (): DiagnosisEntry[] => {
  return diagnoses;
};

export default { getEntries };
