import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { NewArticleValidation, updateArticleValidation, validateArticleIdParam } from "../middlewares/validations/article.validations.js";
import { createArticle, deleteArticle, getArticleById, getMyArticleById, getMyArticles, getPublishedArticles, updateArticle } from "../controllers/article.controller.js";
import { authMiddleware, ownerMiddleware } from "../middlewares/auth.middleware.js";

const articleRoutes = Router();

articleRoutes.post("/articles", authMiddleware, NewArticleValidation, validate, createArticle);
articleRoutes.get("/articles/owner", authMiddleware, getMyArticles);
articleRoutes.get("/articles/owner/:id", authMiddleware, ownerMiddleware, validateArticleIdParam, validate, getMyArticleById);
articleRoutes.get("/articles", authMiddleware, getPublishedArticles);
articleRoutes.get("/articles/:id", authMiddleware, validateArticleIdParam, validate, getArticleById);
articleRoutes.put("/articles/:id", authMiddleware, ownerMiddleware, updateArticleValidation, validate, updateArticle);
articleRoutes.delete("/articles/:id", authMiddleware, ownerMiddleware, validateArticleIdParam, validate, deleteArticle);

export { articleRoutes };