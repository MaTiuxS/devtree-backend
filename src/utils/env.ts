export const getEnv = (key: string): string => {
  const value = process.env[key];
  if (!value) throw new Error(`Variable de entorno ${key} no definida`);
  return value;
};
