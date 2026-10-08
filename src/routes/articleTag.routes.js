import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { newArticleTagValidation, updateArticleTagValidation, validateArticleTagIdParam } from "../middlewares/validations/articleTag.validations.js";
import { createArticleTag, deleteArticleTag, getAllArticleTags, getArticleTagById, updateArticleTag } from "../controllers/articleTag.controller.js";
import { authMiddleware, ownerMiddleware } from "../middlewares/auth.middleware.js";

const articleTagRoutes = Router();

articleTagRoutes.post("/article-tags", authMiddleware, ownerMiddleware, newArticleTagValidation, validate, createArticleTag);
articleTagRoutes.get("/article-tags", authMiddleware, getAllArticleTags);
articleTagRoutes.get("/article-tags/:id", authMiddleware, validateArticleTagIdParam, validate, getArticleTagById);
articleTagRoutes.put("/article-tags/:id", authMiddleware, ownerMiddleware, updateArticleTagValidation, validate, updateArticleTag);
articleTagRoutes.delete("/article-tags/:id", authMiddleware, ownerMiddleware, validateArticleTagIdParam, validate, deleteArticleTag);

export { articleTagRoutes };