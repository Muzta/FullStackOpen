import express from "express";
import { calculateBMI } from "./bmiCalculatorExpress";
import { calculateExercises } from "./exerciseCalculatorExpress";
const app = express();

app.use(express.json());

app.get("/hello", (req, res) => {
  res.send(calculateBMI(req.query));
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { dailyHours, target } = req.body;

  if (!target || isNaN(Number(target)))
    return res
      .status(400)
      .send({ error: "A valid number has to be passed as the target" });

  if (
    !dailyHours ||
    !Array.isArray(dailyHours) ||
    dailyHours.length === 0 ||
    dailyHours.some((hour) => isNaN(Number(hour)))
  )
    return res.status(400).send({
      error: "A proper array of numbers has to be provided as the dailyHours",
    });

  try {
    const result = calculateExercises(dailyHours as number[], Number(target));
    return res.send({ result });
  } catch (error: unknown) {
    if (error instanceof Error)
      return res.status(400).send({ error: error.message });
    else return res.status(500).send({ error: "An unexpected error occurred" });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
