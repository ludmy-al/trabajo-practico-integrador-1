import { matchedData } from "express-validator";
import { article_model, article_tag_model, tag_model } from "../models/index.js";

export const createArticleTag = async (req, res) => {
    try {
        const cleanData = matchedData(req);
        const relation = await article_tag_model.create(cleanData);

        return res.status(201).json({
            ok: true,
            msg: "Relación artículo-etiqueta creada correctamente",
            data: relation
        });
    } catch (error) {
        console.error("Error en createArticleTag:", error);
        return res.status(500).json({ ok: false, msg: "Error al crear la relación artículo-etiqueta" });
    }
};

export const getAllArticleTags = async (req, res) => {
    try {
        const relations = await article_tag_model.findAll({
            include: [
                { model: article_model, as: "article", attributes: ["id", "title"] },
                { model: tag_model, as: "tag", attributes: ["id", "name"] }
            ]
        });

        return res.status(200).json({ ok: true, data: relations });
    } catch (error) {
        console.error("Error en getAllArticleTags:", error);
        return res.status(500).json({ ok: false, msg: "Error al obtener las relaciones artículo-etiqueta" });
    }
};

export const getArticleTagById = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const relation = await article_tag_model.findByPk(id, {
            include: [
                { model: article_model, as: "article", attributes: ["id", "title"] },
                { model: tag_model, as: "tag", attributes: ["id", "name"] }
            ]
        });

        if (!relation) {
            return res.status(404).json({ ok: false, msg: "Relación artículo-etiqueta no encontrada" });
        }

        return res.status(200).json({ ok: true, data: relation });
    } catch (error) {
        console.error("Error en getArticleTagById:", error);
        return res.status(500).json({ ok: false, msg: "Error al obtener la relación artículo-etiqueta" });
    }
};

export const updateArticleTag = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const cleanData = matchedData(req, { locations: ["body"] });
        const relation = await article_tag_model.findByPk(id);

        if (!relation) {
            return res.status(404).json({ ok: false, msg: "Relación artículo-etiqueta no encontrada" });
        }

        await relation.update(cleanData);

        return res.status(200).json({
            ok: true,
            msg: "Relación artículo-etiqueta actualizada correctamente",
            data: relation
        });
    } catch (error) {
        console.error("Error en updateArticleTag:", error);
        return res.status(500).json({ ok: false, msg: "Error al actualizar la relación artículo-etiqueta" });
    }
};

export const deleteArticleTag = async (req, res) => {
    try {
        const { id } = matchedData(req);
        const relation = await article_tag_model.findByPk(id);

        if (!relation) {
            return res.status(404).json({ ok: false, msg: "Relación artículo-etiqueta no encontrada" });
        }

        await relation.destroy();

        return res.status(200).json({
            ok: true,
            msg: "Relación artículo-etiqueta eliminada correctamente"
        });
    } catch (error) {
        console.error("Error en deleteArticleTag:", error);
        return res.status(500).json({ ok: false, msg: "Error al eliminar la relación artículo-etiqueta" });
    }
};