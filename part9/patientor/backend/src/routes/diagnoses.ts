import express from "express";
import diagnosesService from "../services/diagnoses";
import { toNewDiagnosisEntry } from "../../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(diagnosesService.getEntries());
});

router.post("/", (req, res) => {
  try {
    const newDiagnosisEntry = toNewDiagnosisEntry(req.body);
    const addedEntry = diagnosesService.addEntry(newDiagnosisEntry);
    res.json(addedEntry);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) errorMessage += error.message;
    res.status(400).send(errorMessage);
  }
});

export default router;
