import express from "express";
const app = express();
import { calculateBMI } from "./bmiCalculatorExpress";

app.get("/hello", (req, res) => {
  res.send(calculateBMI(req.query));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
