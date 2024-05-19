import { TextFieldProps } from "@mui/material";
import { HealthCheckRating } from "./types";

export const textFieldStyle: TextFieldProps = {
  variant: "standard",
  margin: "dense",
  InputLabelProps: { shrink: true },
};

export const healthCheckRatingEntries = Object.entries(
  HealthCheckRating
).filter(([_key, value]) => typeof value === "number") as [
  keyof typeof HealthCheckRating,
  number
][];
