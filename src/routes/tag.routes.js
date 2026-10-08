import { Router } from "express";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tag.controller.js";
import { validate } from "../middlewares/validate.js";
import { newTagValidation, updateTagValidation, validateTagIdParam } from "../middlewares/validations/tag.validations.js";
import { authMiddleware, adminMiddleware } from "../middlewares/auth.middleware.js";

const tagRoutes = Router()

tagRoutes.post("/tags", authMiddleware, adminMiddleware, newTagValidation, validate, createTag);
tagRoutes.get("/tags", authMiddleware, getAllTags);
tagRoutes.get("/tags/:id", authMiddleware, adminMiddleware, validateTagIdParam, validate, getTagById);
tagRoutes.put("/tags/:id", authMiddleware, adminMiddleware, updateTagValidation, validate, updateTag);
tagRoutes.delete("/tags/:id", authMiddleware, adminMiddleware, validateTagIdParam, validate, deleteTag);

export { tagRoutes }