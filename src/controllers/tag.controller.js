import { matchedData } from "express-validator";
import { article_model, tag_model } from "../models/index.js";

export const createTag = async (req, res) => {
	try {
		const cleanData = matchedData(req);
		const tag = await tag_model.create(cleanData);

		return res.status(201).json({
			ok: true,
			msg: "Etiqueta creada correctamente",
			data: tag
		});
	} catch (error) {
		console.error("Error en createTag:", error);
		return res.status(500).json({ ok: false, msg: "Error al crear la etiqueta" });
	}
};

export const getAllTags = async (req, res) => {
	try {
		const tags = await tag_model.findAll({
			include: [{ model: article_model, as: "article", through: { attributes: [] } }]
		});

		return res.status(200).json({ ok: true, data: tags });
	} catch (error) {
		console.error("Error en getAllTags:", error);
		return res.status(500).json({ ok: false, msg: "Error al obtener las etiquetas" });
	}
};

export const getTagById = async (req, res) => {
	try {
		const { id } = matchedData(req);
		const tag = await tag_model.findByPk(id, {
			include: [{ model: article_model, as: "article", through: { attributes: [] } }]
		});

		if (!tag) {
			return res.status(404).json({ ok: false, msg: "Etiqueta no encontrada" });
		}

		return res.status(200).json({ ok: true, data: tag });
	} catch (error) {
		console.error("Error en getTagById:", error);
		return res.status(500).json({ ok: false, msg: "Error al obtener la etiqueta" });
	}
};

export const updateTag = async (req, res) => {
	try {
		const { id } = matchedData(req);
		const cleanData = matchedData(req, { locations: ["body"] });
		const tag = await tag_model.findByPk(id);

		if (!tag) {
			return res.status(404).json({ ok: false, msg: "Etiqueta no encontrada" });
		}

		await tag.update(cleanData);
		return res.status(200).json({
			ok: true,
			msg: "Etiqueta actualizada correctamente",
			data: tag
		});
	} catch (error) {
		console.error("Error en updateTag:", error);
		return res.status(500).json({ ok: false, msg: "Error al actualizar la etiqueta" });
	}
};

export const deleteTag = async (req, res) => {
	try {
		const { id } = matchedData(req);
		const tag = await tag_model.findByPk(id);

		if (!tag) {
			return res.status(404).json({ ok: false, msg: "Etiqueta no encontrada" });
		}

		await tag.destroy();
		return res.status(200).json({ ok: true, msg: "Etiqueta eliminada correctamente" });
	} catch (error) {
		console.error("Error en deleteTag:", error);
		return res.status(500).json({ ok: false, msg: "Error al eliminar la etiqueta" });
	}
};