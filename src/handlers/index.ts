import type { Request, Response } from "express";
import slug from "slug";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";

// Authentication and Registration
const createAccount = async (req: Request, res: Response) => {
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

export const login = async (req: Request, res: Response) => {
  // Check if the user registered
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Ul usuario no existe");
    return res.status(400).json({ error: error.message });
  }

  // Check pasword
  const isPasswordCorrect = await checkPassword(password, user.password);
  if (!isPasswordCorrect) {
    const error = new Error("La contraseña es incorrecta");
    return res.status(401).json({ error: error.message });
  }
  return res.send("Autenticado...");
};

export { createAccount };
