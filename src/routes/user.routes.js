import { Router } from "express";
import { CreateUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";
import { newUserValidation, updateUserValidation } from "../middlewares/validations/user.validations.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";

const userRoutes = Router();

userRoutes.post("/users", authMiddleware, adminMiddleware, newUserValidation, validate, CreateUser);
userRoutes.get("/users", authMiddleware, adminMiddleware, getAllUsers);
userRoutes.get("/users/:id", authMiddleware, adminMiddleware, getUserById);
userRoutes.put("/users/:id", authMiddleware, adminMiddleware, updateUserValidation, validate, updateUser);
userRoutes.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

export { userRoutes };