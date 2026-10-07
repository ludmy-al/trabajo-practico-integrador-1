import { Router } from "express";

const profileRoutes = Router()

profileRoutes.post("/profiles")
profileRoutes.get("/profiles")
profileRoutes.get("/profiles/:id")
profileRoutes.put("/profiles/:id")
profileRoutes.delete("/profiles/:id")

export { profileRoutes }