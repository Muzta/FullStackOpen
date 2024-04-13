import express from "express";
import patientsService from "../services/patients";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});

router.post("/", (_req, res) => {
  res.send("Saving a patient");
});

export default router;
