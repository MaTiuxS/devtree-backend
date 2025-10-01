import mongoose from "mongoose";
import colors from "colors";
import { getEnv } from "../utils/env";

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(getEnv("MONGO_URI"));
    const { host, port } = connection;
    console.log(colors.cyan.bold(`MongoDB conectado en ${host}:${port}`));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log(colors.bgRed.white.bold(error.message));
    } else {
      console.log(colors.bgRed.white.bold(String(error)));
    }
    process.exit(1);
  }
};
