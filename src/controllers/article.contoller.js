import { matchedData } from "express-validator";
import { article_model, user_model, tag_model } from "../models/index.js";
 


export const createArticle = async (req, res) => {
    try {
        const cleanData = matchedData(req); 

        const newArticle = await article_model.create(cleanData);

        return res.status(201).json({
            ok: true,
            msg: "Artículo creado exitosamente",
            data: newArticle
        });
    } catch (error) {
        console.error("Error en createArticle:", error);
        return res.status(500).json({ ok: false, msg: "Error al intentar crear el artículo" });
    }
};


export const getPublishedArticles = async (req, res) => {
    try {
        const articles = await article_model.findAll({
            where: { status: 'published' },
            include: [
                { 
                    model: user_model, 
                    as: 'author', 
                    attributes: ['id', 'username', 'email'] 
                },
                { 
                    model: tag_model, 
                    as: 'tags', 
                    through: { attributes: [] } 
                }
            ]
        });

        return res.status(200).json({
            ok: true,
            data: articles
        });
    } catch (error) {
        console.error("Error en getPublishedArticles:", error);
        return res.status(500).json({ ok: false, msg: "Error al obtener los artículos" });
    }
};


export const getArticleById = async (req, res) => {
    try {
        const { id } = matchedData(req); 

        const article = await article_model.findByPk(id, {
            include: [
                { 
                    model: user_model, 
                    as: 'author', 
                    attributes: ['id', 'username', 'email'] 
                },
                { 
                    model: tag_model, 
                    as: 'tags', 
                    through: { attributes: [] } 
                }
            ]
        });

        if (!article) {
            return res.status(404).json({
                ok: false,
                msg: "Artículo no encontrado"
            });
        }

        return res.status(200).json({
            ok: true,
            data: article
        });
    } catch (error) {
        console.error("Error en getArticleById:", error);
        return res.status(500).json({ ok: false, msg: "Error al obtener el artículo" });
    }
};


export const getMyArticles = async (req, res) => {
    try {
        const userId = req.user.id;

        const articles = await article_model.findAll({
            where: { user_id: userId },
            include: [
                { 
                    model: tag_model, 
                    as: 'tags', 
                    through: { attributes: [] } 
                }
            ]
        });

        return res.status(200).json({
            ok: true,
            data: articles
        });
    } catch (error) {
        console.error("Error en getMyArticles:", error);
        return res.status(500).json({ ok: false, msg: "Error al obtener tus artículos" });
    }
};


export const getMyArticleById = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const userId = req.user.id;

        const article = await article_model.findOne({
            where: { 
                id, 
                user_id: userId 
            },
            include: [
                { 
                    model: tag_model, 
                    as: 'tags', 
                    through: { attributes: [] } 
                }
            ]
        });

        if (!article) {
            return res.status(404).json({
                ok: false,
                msg: "Artículo no encontrado en tu lista personal"
            });
        }

        return res.status(200).json({
            ok: true,
            data: article
        });
    } catch (error) {
        console.error("Error en getMyArticleById:", error);
        return res.status(500).json({ ok: false, msg: "Error al obtener el artículo" });
    }
};


export const updateArticle = async (req, res) => {
    try {
        const cleanData = matchedData(req);
        const { id } = req.params;

        const article = await article_model.findByPk(id);

        if (!article) {
            return res.status(404).json({
                ok: false,
                msg: "Artículo no encontrado"
            });
        }
        await article.update(cleanData);

        return res.status(200).json({
            ok: true,
            msg: "Artículo actualizado correctamente",
            data: article
        });
    } catch (error) {
        console.error("Error en updateArticle:", error);
        return res.status(500).json({ ok: false, msg: "Error al actualizar el artículo" });
    }
};

export const deleteArticle = async (req, res) => {
    try {
        const { id } = matchedData(req);

        const article = await article_model.findByPk(id);

        if (!article) {
            return res.status(404).json({
                ok: false,
                msg: "Artículo no encontrado"
            });
        }

        if (article.user_id !== req.user.id && req.user.role !== 'admin') {
            return res.status(403).json({
                ok: false,
                msg: "No tienes autorización para eliminar este artículo"
            });
        }

        await article.destroy();

        return res.status(200).json({
            ok: true,
            msg: "Artículo eliminado exitosamente"
        });
    } catch (error) {
        console.error("Error en deleteArticle:", error);
        return res.status(500).json({ ok: false, msg: "Error al intentar eliminar el artículo" });
    }
};