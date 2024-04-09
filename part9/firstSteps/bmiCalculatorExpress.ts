import { isNotNumber } from "./utils";

interface QueryValues {
  height: number;
  weight: number;
}

const parseBmiQueries = (queries: {
  height?: string;
  weight?: string;
}): QueryValues => {
  if (Object.values(queries).length !== 2)
    throw new Error("You have to provide 2 on the URL");

  const { height, weight } = queries;

  if (!height || !weight)
    throw new Error("You have to provide both height and weight queries");

  if (isNotNumber(height) || isNotNumber(weight))
    throw new Error("Provided queries must be valid numbers");
  return { height: Number(height), weight: Number(weight) };
};

const bmiCalculator = (height: number, weight: number): string => {
  if (isNotNumber(height) || isNotNumber(weight))
    throw new Error("You have to provide numbers");
  if (height === 0) throw new Error("Weight can't be zero");

  const bmi = weight / Math.pow(height / 100, 2);
  if (isNotNumber(bmi)) throw new Error("Something bad happened!");
  else if (bmi < 16) return "Underweight (Severe thinness)";
  else if (bmi >= 16 && bmi < 17) return "Underweight (Moderate thinness)";
  else if (bmi >= 17 && bmi < 18.5) return "Underweight (Mild thinness)";
  else if (bmi >= 18.5 && bmi < 25) return "Normal range";
  else if (bmi >= 25 && bmi < 30) return "Overweight (Pre-obese)";
  else if (bmi >= 30 && bmi < 35) return "Obese (Class I)";
  else if (bmi >= 35 && bmi < 40) return "Obese (Class II)";
  else return "Obese (Class III)";
};

export const calculateBMI = (queries: object): object => {
  try {
    const { weight, height } = parseBmiQueries(queries);
    return { weight, height, bmi: bmiCalculator(height, weight) };
  } catch (error: unknown) {
    let errorMessage = "Something went wrong: ";
    if (error instanceof Error) errorMessage += error.message;
    return { error: errorMessage };
  }
};
