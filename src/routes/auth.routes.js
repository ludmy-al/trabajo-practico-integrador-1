import { Router } from "express";
import { register, login, getAuthProfile, updateAuthProfile, logout } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { newUserValidation, loginUserValidation } from "../middlewares/validations/user.validations.js";

const authRoutes = Router();

authRoutes.post("/auth/register", newUserValidation, validate, register);
authRoutes.post("/auth/login", loginUserValidation, validate, login);
authRoutes.get("/auth/profile", authMiddleware, getAuthProfile);
authRoutes.put("/auth/profile", authMiddleware, updateAuthProfile, validate);
authRoutes.post("/auth/logout", authMiddleware, logout);

export { authRoutes };