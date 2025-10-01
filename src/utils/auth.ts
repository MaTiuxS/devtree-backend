import bcrypt from "bcrypt";

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

const checkPassword = async (enteredPassword: string, hash: string) => {
  return await bcrypt.compare(enteredPassword, hash);
};

export { hashPassword, checkPassword };
