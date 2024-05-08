import { Typography, Icon } from "@mui/material";
import { OccupationalHealthcareEntry as OccupationalEntryType } from "../../../types";

interface Props {
  entry: OccupationalEntryType;
}

const OccupationalHealthcareEntry = ({ entry }: Props) => {
  return (
    <>
      <Typography>
        {entry.date} <Icon>work</Icon> <i>{entry.employerName}</i>
      </Typography>
      <Typography fontStyle="italic">{entry.description}</Typography>
      {entry.sickLeave && (
        <Typography>
          <b>Sick Leave</b>: {entry.sickLeave?.startDate} -{" "}
          {entry.sickLeave?.endDate}
        </Typography>
      )}
    </>
  );
};

export default OccupationalHealthcareEntry;
