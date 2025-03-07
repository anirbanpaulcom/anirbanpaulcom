export const toCamelCase = (str: string) => {
  if (/^[a-z][a-zA-Z0-9]*$/.test(str)) {
    return str;
  }

  return str
    .toLowerCase()
    .replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};
