import { Router } from "express";
import {
  createAccount,
  getUser,
  getUserByHandle,
  login,
  searchByHandle,
  updateProfile,
  uploadImage,
} from "../handlers";
import { body } from "express-validator";
import { handleinputErrors } from "../middleware/validation";
import { authenticate } from "../middleware/auth";

const router: Router = Router();

// Routing
router.post(
  "/auth/register",
  body("handle").notEmpty().withMessage("El handle no puede ir vacio"),
  body("name").notEmpty().withMessage("El nombre no puede ir vacio"),
  body("email").isEmail().withMessage("El email no es valido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres")
    .matches(/[A-Z]/)
    .withMessage("La contraseña debe contener al menos una letra mayúscula")
    .matches(/[a-z]/)
    .withMessage("La contraseña debe contener al menos una letra minúscula")
    .matches(/[0-9]/)
    .withMessage("La contraseña debe contener al menos un número")
    .matches(/[\W_]/)
    .withMessage("La contraseña debe contener al menos un carácter especial"),
  handleinputErrors,
  createAccount
);

router.post(
  "/auth/login",
  body("email").isEmail().withMessage("El email no es valido"),
  body("password").notEmpty().withMessage("La contraseña es obligatoria"),
  handleinputErrors,
  login
);

router.get("/user", authenticate, getUser);
router.patch(
  "/user",
  body("handle").notEmpty().withMessage("El handle no puede ir vacio"),
  body("description")
    .notEmpty()
    .withMessage("La descripcion no puede ir vacia"),
  handleinputErrors,
  authenticate,
  updateProfile
);

router.post("/user/image", authenticate, uploadImage);

router.get("/:handle", getUserByHandle);

router.post(
  "/search",
  body("handle").notEmpty().withMessage("El handle no puede ir vacio"),
  handleinputErrors,
  searchByHandle
);

export default router;
