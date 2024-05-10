import express from "express";
import { toNewEntry, toNewPatientEntry } from "../../utils";
import patientsService from "../services/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addEntry(newPatientEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) errorMessage += error.message;
    res.status(400).send(errorMessage);
  }
});

router.get("/:id", (req, res) => {
  try {
    const id = req.params.id;
    const patient = patientsService.findById(id);
    if (patient) res.send(patient);
    else res.sendStatus(404);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) errorMessage += error.message;
    res.status(400).send(errorMessage);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const id = req.params.id;
    const addedEntry = patientsService.addPatientEntry(newEntry, id);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) errorMessage += error.message;
    res.status(400).send(errorMessage);
  }
});

export default router;
