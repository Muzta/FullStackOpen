import { Typography, Icon } from "@mui/material";
import {
  HealthCheckEntry as HealthCheckEntryType,
  HealthCheckRating,
} from "../../../types";

interface Props {
  entry: HealthCheckEntryType;
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const HealthCheckEntry = ({ entry }: Props) => {
  let healthRating;

  switch (entry.healthCheckRating) {
    case HealthCheckRating.Healthy:
      healthRating = <Icon style={{ color: "green" }}>favorite</Icon>;
      break;
    case HealthCheckRating.LowRisk:
      healthRating = <Icon style={{ color: "yellow" }}>favorite</Icon>;
      break;
    case HealthCheckRating.HighRisk:
      healthRating = <Icon style={{ color: "orange" }}>favorite</Icon>;
      break;
    case HealthCheckRating.CriticalRisk:
      healthRating = <Icon style={{ color: "red" }}>favorite</Icon>;
      break;
    default:
      return assertNever(entry.healthCheckRating);
  }

  return (
    <>
      <Typography>
        {entry.date} <Icon>event</Icon>
      </Typography>
      <Typography fontStyle="italic">{entry.description}</Typography>
      {healthRating}
    </>
  );
};

export default HealthCheckEntry;
