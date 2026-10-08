import { body, param } from "express-validator";
import { article_model } from "../../models/article.model.js";
import { tag_model } from "../../models/tag.model.js";
import { article_tag_model } from "../../models/articleTag.model.js";

const articleIdValidation = (required) => {
    const validation = body("article_id");

    if (required) {
        validation.notEmpty().withMessage("El ID del artículo es obligatorio");
    } else {
        validation.optional();
    }

    return validation
        .isInt({ min: 1 }).withMessage("El ID del artículo debe ser un número entero válido")
        .custom(async (article_id, { req }) => {
            const article = await article_model.findByPk(article_id);
            if (!article) {
                throw new Error("El artículo no existe");
            }

            const tag_id = req.body.tag_id;
            if (article_id && tag_id) {
                const relation = await article_tag_model.findOne({ where: { article_id, tag_id } });
                if (relation && (!req.params.id || relation.id !== Number(req.params.id))) {
                    throw new Error("La relación artículo-etiqueta ya existe");
                }
            }
        });
};

const tagIdValidation = (required) => {
    const validation = body("tag_id");

    if (required) {
        validation.notEmpty().withMessage("El ID de la etiqueta es obligatorio");
    } else {
        validation.optional();
    }

    return validation
        .isInt({ min: 1 }).withMessage("El ID de la etiqueta debe ser un número entero válido")
        .custom(async (tag_id, { req }) => {
            const tag = await tag_model.findByPk(tag_id);
            if (!tag) {
                throw new Error("La etiqueta no existe");
            }

            const article_id = req.body.article_id;
            if (article_id && tag_id) {
                const relation = await article_tag_model.findOne({ where: { article_id, tag_id } });
                if (relation && (!req.params.id || relation.id !== Number(req.params.id))) {
                    throw new Error("La relación artículo-etiqueta ya existe");
                }
            }
        });
};

export const validateArticleTagIdParam = [
    param("id")
        .isInt({ min: 1 }).withMessage("El ID de la relación debe ser un número entero válido")
];

export const newArticleTagValidation = [
    articleIdValidation(true),
    tagIdValidation(true)
];

export const updateArticleTagValidation = [
    ...validateArticleTagIdParam,
    articleIdValidation(false),
    tagIdValidation(false)
];