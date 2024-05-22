import { Diagnosis } from "../../types";

interface Props {
  codes: string[];
  diagnoses: Diagnosis[];
}

const DiagnosisDetails = ({ codes, diagnoses }: Props) => {
  const isValidDiagnosis = (
    diagnosis: Diagnosis | undefined
  ): diagnosis is Diagnosis => {
    return diagnosis !== undefined;
  };

  const filteredEntries: Diagnosis[] = codes
    .map((code) => diagnoses.find((diagnosis) => diagnosis.code === code))
    .filter(isValidDiagnosis);

  if (!filteredEntries || filteredEntries.length === 0) return null;

  return (
    <ul>
      {filteredEntries.map((entry) => (
        <li key={entry.code}>
          {entry.code}: {entry.name}
        </li>
      ))}
    </ul>
  );
};

export default DiagnosisDetails;
