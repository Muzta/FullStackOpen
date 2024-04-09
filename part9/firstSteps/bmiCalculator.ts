import { isNotNumber } from "./utils";

interface ArgValues {
  height: number;
  weight: number;
}

const parseBmiArguments = (args: string[]): ArgValues => {
  if (args.length !== 4) throw new Error("You have to provide 3 arguments");

  if (isNotNumber(args[2]) || isNotNumber(args[3]))
    throw new Error("Provided arguments were not numbers");
  else return { height: Number(args[2]), weight: Number(args[3]) };
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

try {
  const { height, weight } = parseBmiArguments(process.argv);
  console.log(bmiCalculator(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) errorMessage += error.message;
  console.log(errorMessage);
}
