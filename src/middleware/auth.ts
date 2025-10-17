import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import { getEnv } from "../utils/env";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    const error = new Error("No autorizado");
    return res.status(401).json({ error: error.message });
  }
  const [, token] = bearer.split(" ");

  if (!token) {
    const error = new Error("No autorizado");
    return res.status(401).json({ error: error.message });
  }

  try {
    const result = jwt.verify(token, getEnv("JWT_SECRET"));
    if (typeof result === "object" && result.id) {
      const user = await User.findById(result.id).select("-password");
      if (!user) {
        const error = new Error("el usuario no existe");
        return res.status(401).json({ error: error.message });
      }
      req.user = user;
      next();
    }
  } catch (error) {
    return res.status(500).json({ error: "Token no valido" });
  }
  return;
};
