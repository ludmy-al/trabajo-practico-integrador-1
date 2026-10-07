import { Router } from "express";

const articleRoutes = Router()

articleRoutes.post("/articles")
articleRoutes.get("/articles")
articleRoutes.get("/articles/:id")
articleRoutes.put("/articles/:id")
articleRoutes.delete("/articles/:id")

export { articleRoutes }