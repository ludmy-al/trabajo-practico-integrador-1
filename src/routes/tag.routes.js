import { Router } from "express";
import { createTag, deleteTag, getAllTags, getTagById, updateTag } from "../controllers/tag.controller.js";
import { validate } from "../middlewares/validate.js";
import { newTagValidation, updateTagValidation, validateTagIdParam } from "../middlewares/validations/tag.validations.js";

const tagRoutes = Router()

tagRoutes.post("/tags", newTagValidation, validate, createTag);
tagRoutes.get("/tags", getAllTags);
tagRoutes.get("/tags/:id", validateTagIdParam, validate, getTagById);
tagRoutes.put("/tags/:id", updateTagValidation, validate, updateTag);
tagRoutes.delete("/tags/:id", validateTagIdParam, validate, deleteTag)

export { tagRoutes }