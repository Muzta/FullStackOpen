import diagnosesData from "../../data/diagnoses";
import { DiagnosisEntry } from "../types/interfaces";

const diagnoses: DiagnosisEntry[] = diagnosesData;

const getEntries = () => {
  return diagnoses;
};

export default { getEntries };
