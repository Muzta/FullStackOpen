import { Button, Container, Divider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import { apiBaseUrl } from "./constants";
import { Diagnosis, NonSensitivePatient } from "./types";

import PatientDetails from "./components/PatientDetails";
import PatientListPage from "./components/PatientListPage";
import patientService from "./services/patients";
import diagnosesService from "./services/diagnoses";

const App = () => {
  const [patients, setPatients] = useState<NonSensitivePatient[]>([]);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  // Fetch diagnoses
  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnoses = await diagnosesService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, []);

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);

  return (
    <div className="App">
      <Container>
        <Typography variant="h3">Patientor</Typography>
        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          style={{ margin: "1.5rem 0" }}
        >
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route
            path="/:id"
            element={<PatientDetails diagnoses={diagnoses} />}
          />
          <Route
            path="/"
            element={
              <PatientListPage patients={patients} setPatients={setPatients} />
            }
          />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
