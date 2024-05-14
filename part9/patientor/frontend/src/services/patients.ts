import axios from "axios";
import {
  EntryWithoutId,
  NonSensitivePatient,
  Patient,
  PatientFormValues,
} from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<NonSensitivePatient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const getById = async (id: string) => {
  const { data } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return data;
};

const createEntry = async (id: string, entry: EntryWithoutId) => {
  console.log("FUNC", entry);
  const { data } = await axios.post<EntryWithoutId>(
    `${apiBaseUrl}/patients/${id}/entries`,
    entry
  );
  console.log("DATA", data);

  return data;
};

export default {
  getAll,
  create,
  getById,
  createEntry,
};
