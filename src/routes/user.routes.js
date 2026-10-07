import { Router } from "express";
import { CreateUser } from "../controllers/user.controller.js";
import { newUserValidation } from "../middlewares/validations/user.validations.js";

const userRoutes = Router()

userRoutes.post("/users",newUserValidation,CreateUser)
userRoutes.get("/users")
userRoutes.get("/users/:id")
userRoutes.put("/users/:id")
userRoutes.delete("/users/:id")