import jwt, { JwtPayload } from "jsonwebtoken";
import { getEnv } from "./env";

export const generateJWT = (payload: JwtPayload) => {
  const token = jwt.sign(payload, getEnv("JWT_SECRET"), {
    expiresIn: "180d",
  });

  return token;
};
