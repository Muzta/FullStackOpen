export const isNotNumber = (argument: string | number): boolean =>
  isNaN(Number(argument));
