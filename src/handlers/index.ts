import type { Request, Response } from "express";
import slug from "slug";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import { validationResult } from "express-validator";

// Authentication and Registration
const createAccount = async (req: Request, res: Response) => {
  // handle errors
  let errors = validationResult(req);
  if (!errors.isEmpty()) res.status(400).json({ errors: errors.array() });

  return;
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) {
    const error = new Error("Un usuario con ese email ya esta registrado");
    return res.status(409).json({ error: error.message });
  }

  const handle = slug(req.body.handle, "");
  const handleExist = await User.findOne({ handle });
  if (handleExist) {
    const error = new Error("El nombre de usuario no esta disponible");
    return res.status(409).json({ error: error.message });
  }

  const user = new User(req.body);
  user.password = await hashPassword(password);
  user.handle = handle;
  await user.save();
  return res.status(201).send("Usuario creado correctamente");
};

export { createAccount };
