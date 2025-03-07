export const randomValue = (values: unknown[]) => {
  return values[Math.floor(Math.random() * values.length)];
};
