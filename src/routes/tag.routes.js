import { Router } from "express";

const tagRoutes = Router()

tagRoutes.post("/tags")
tagRoutes.get("/tags")
tagRoutes.get("/tags/:id")
tagRoutes.put("/tags/:id")
tagRoutes.delete("/tags/:id")

export { tagRoutes }