import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import { NewArticleValidation, updateArticleValidation, validateArticleIdParam } from "../middlewares/validations/article.validations.js";
import { createArticle, getArticleById, getMyArticleById, getMyArticles, getPublishedArticles, updateArticle } from "../controllers/article.controller.js";

const articleRoutes = Router()

articleRoutes.post("/articles", NewArticleValidation, validate,createArticle)
articleRoutes.get("/articles/owner",getMyArticles)
articleRoutes.get("/articles/owner/:id",getMyArticleById)

articleRoutes.get("/articles",validateArticleIdParam,getPublishedArticles)
articleRoutes.get("/articles/:id",validateArticleIdParam,getArticleById)



articleRoutes.put("/articles/:id",updateArticleValidation,validate,updateArticle)
articleRoutes.delete("/articles/:id",updateArticle)

export { articleRoutes }