import { isNotNumber } from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ArgsValues {
  dailyHours: number[];
  target: number;
}

const parseExercisesArguments = (args: string[]): ArgsValues => {
  if (args.length < 4)
    throw new Error("You have to provide at least 4 arguments");

  if (args.slice(2).some((hours) => isNotNumber(hours)))
    throw new Error("Every argument has to be a number");
  else
    return {
      dailyHours: args.slice(3).map((arg) => Number(arg)),
      target: Number(args[2]),
    };
};

const calculateExercises = (dailyHours: number[], target: number) => {
  if (dailyHours.some((hour) => isNotNumber(hour)) || isNotNumber(target))
    throw new Error("An array of numbers and a number have to be provided");

  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((day) => day !== 0);
  const trainingHours = trainingDays.reduce(
    (sum, currentValue) => sum + currentValue,
    0
  );
  const success = dailyHours.every((day) => day >= target);
  let rating, ratingDescription;
  if (success) {
    if (trainingHours >= target * 1.5) {
      rating = 3;
      ratingDescription =
        "You have been really dedicated these days, great job!";
    } else {
      rating = 2;
      ratingDescription = "You reached your goal, congratulations";
    }
  } else {
    rating = 1;
    ratingDescription = "You have not reached your goal";
  }
  const average = trainingHours / periodLength;

  return {
    periodLength,
    trainingDays: trainingDays.length,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { dailyHours, target } = parseExercisesArguments(process.argv);
  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong: ";
  if (error instanceof Error) errorMessage += error.message;
  console.log(errorMessage);
}
