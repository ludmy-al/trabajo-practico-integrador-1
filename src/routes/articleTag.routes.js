import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { newArticleTagValidation, updateArticleTagValidation, validateArticleTagIdParam } from "../middlewares/validations/articleTag.validations.js";
import { createArticleTag, deleteArticleTag, getAllArticleTags, getArticleTagById, updateArticleTag } from "../controllers/articleTag.controller.js";

const articleTagRoutes = Router();

articleTagRoutes.post("/article-tags", newArticleTagValidation, validate, createArticleTag);
articleTagRoutes.get("/article-tags", getAllArticleTags);
articleTagRoutes.get("/article-tags/:id", validateArticleTagIdParam, validate, getArticleTagById);
articleTagRoutes.put("/article-tags/:id", updateArticleTagValidation, validate, updateArticleTag);
articleTagRoutes.delete("/article-tags/:id", validateArticleTagIdParam, validate, deleteArticleTag);

export { articleTagRoutes };