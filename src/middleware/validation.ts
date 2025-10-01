import type { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const handleinputErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // handle errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};
