interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyHours: number[], target: number) => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
