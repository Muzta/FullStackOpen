import { Typography, Icon } from "@mui/material";
import { HospitalEntry as HospitalEntryType } from "../../../types";

interface Props {
  entry: HospitalEntryType;
}

const HospitalEntry = ({ entry }: Props) => {
  return (
    <>
      <Typography>
        {entry.date} <Icon>medical_services</Icon>
      </Typography>
      <Typography fontStyle="italic">{entry.description}</Typography>
      <Typography>
        <b>Discharge</b>: ({entry.discharge.date}){" "}
        <i>{entry.discharge.criteria}</i>
      </Typography>
    </>
  );
};

export default HospitalEntry;
