import { Router } from "express";
import { register, login, getAuthProfile, updateAuthProfile, logout } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";

const authRoutes = Router();

authRoutes.post("/auth/register", register, validate);
authRoutes.post("/auth/login", login, validate);
authRoutes.get("/auth/profile", authMiddleware, getAuthProfile);
authRoutes.put("/auth/profile", authMiddleware, updateAuthProfile, validate);
authRoutes.post("/auth/logout", authMiddleware, logout);

export { authRoutes };