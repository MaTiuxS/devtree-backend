import type { Request, Response } from "express";
import slug from "slug";
import formidable from "formidable";
import { v4 as uuid } from "uuid";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import { generateJWT } from "../utils/jwt";
import cloudinary from "../config/cloudinary";

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
    const error = new Error("El handle no esta disponible");
    return res.status(409).json({ error: error.message });
  }

  const user = new User(req.body);
  user.password = await hashPassword(password);
  user.handle = handle;
  await user.save();
  return res.status(201).send("Usuario creado correctamente");
};

const login = async (req: Request, res: Response) => {
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
    const error = new Error("La contraseña o el usuario son incorrectos");
    return res.status(401).json({ error: error.message });
  }

  const token = generateJWT({ id: user._id });
  return res.send(token);
};

const getUser = async (req: Request, res: Response) => {
  res.json(req.user);
};

const updateProfile = async (req: Request, res: Response) => {
  try {
    const { description, handle, links } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }

    const handleNew = slug(handle || "");

    if (handleNew !== req.user.handle) {
      const handleExists = await User.findOne({ handle });
      if (handleExists) {
        const error = new Error("El nombre de usuario ya esta en uso");
        return res.status(409).json({ error: error.message });
      }
      req.user.handle = handle;
    }

    if (description !== undefined) {
      req.user.description = description;
    }
    req.user.links = links;
    await req.user.save();
    return res
      .status(200)
      .json({ message: "Perfil actualizado correctamente" });
  } catch (e) {
    const error = new Error("Hubo un error");
    return res.status(500).json({ error: error.message });
  }
};

const uploadImage = async (req: Request, res: Response) => {
  const form = formidable({
    multiples: false,
    maxFileSize: 5 * 1024 * 1024,
  });
  try {
    form.parse(req, (error, fields, files) => {
      if (error) {
        console.log(error);
      }
      fields;

      const file = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!file || !file.filepath) {
        return res.status(400).json({ message: "No se subio ninguna imagen" });
      }
      cloudinary.uploader.upload(
        file.filepath,
        { public_id: uuid() },
        async (error, result) => {
          if (error) {
            const error = new Error("Hubo un error al subir una imagen");
            return res.status(500).json({ error: error.message });
          }
          if (result) {
            if (!req.user) {
              return res.status(401).json({ error: "Usuario no encontrado" });
            }
            req.user.image = result.secure_url;
            await req.user.save();
            res.json({ image: result.secure_url });
          }
          return;
        }
      );
      return;
    });
    return;
  } catch (e) {
    const error = new Error("Hubo un error");
    return res.status(500).json({ error: error.message });
  }
};
export { createAccount, login, getUser, updateProfile, uploadImage };

export const getUserByHandle = async (req: Request, res: Response) => {
  try {
    const { handle } = req.params;
    const user = await User.findOne({ handle }).select(
      "-_id -password -__v -email"
    );
    if (!user) {
      const error = new Error("El usuario no existe");
      return res.status(404).json({ error: error });
    }

    return res.json(user);
  } catch (e) {
    const error = new Error("Hubo un error");
    return res.status(500).json({ error: error.message });
  }
};

export const searchByHandle = async (req: Request, res: Response) => {
  try {
    const { handle } = req.body;
    const userExist = await User.findOne({ handle });
    if (userExist) {
      const error = new Error(`${handle} ya esta registrado`);
      return res.status(409).json({ error: error.message });
    }

    return res.send(`${handle} esta disponible`);
  } catch (e) {
    const error = new Error("Hubo un error");
    return res.status(500).json({ error: error.message });
  }
};
