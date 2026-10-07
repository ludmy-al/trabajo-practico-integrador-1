import { Router } from "express";
import { CreateUser, deleteUser, getAllUsers, getUserById, updateUser } from "../controllers/user.controller.js";
import { newUserValidation, updateUserValidation } from "../middlewares/validations/user.validations.js";
import { validate } from "../middlewares/validate.js";

const userRoutes = Router()

userRoutes.post("/users",newUserValidation,validate,CreateUser)
userRoutes.get("/users",getAllUsers)
userRoutes.get("/users/:id",getUserById)
userRoutes.put("/users/:id",updateUserValidation,validate,updateUser)
userRoutes.delete("/users/:id",deleteUser)

export { userRoutes }