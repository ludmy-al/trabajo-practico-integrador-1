import { matchedData } from "express-validator";
import { profile_model, user_model } from "../models/index.js";

export const createProfile = async (req, res) => {
	try {
		const cleanData = matchedData(req);
		const profile = await profile_model.create(cleanData);

		return res.status(201).json({
			ok: true,
			msg: "Perfil creado correctamente",
			data: profile
		});
	} catch (error) {
		console.error("Error en createProfile:", error);
		return res.status(500).json({ ok: false, msg: "Error al crear el perfil" });
	}
};

export const getAllProfiles = async (req, res) => {
	try {
		const profiles = await profile_model.findAll({
			include: [{ model: user_model, as: "user", attributes: ["id", "username", "email"] }]
		});

		return res.status(200).json({ ok: true, data: profiles });
	} catch (error) {
		console.error("Error en getAllProfiles:", error);
		return res.status(500).json({ ok: false, msg: "Error al obtener los perfiles" });
	}
};

export const getProfileById = async (req, res) => {
	try {
		const { id } = matchedData(req);
		const profile = await profile_model.findByPk(id, {
			include: [{ model: user_model, as: "user", attributes: ["id", "username", "email"] }]
		});

		if (!profile) {
			return res.status(404).json({ ok: false, msg: "Perfil no encontrado" });
		}

		return res.status(200).json({ ok: true, data: profile });
	} catch (error) {
		console.error("Error en getProfileById:", error);
		return res.status(500).json({ ok: false, msg: "Error al obtener el perfil" });
	}
};

export const updateProfile = async (req, res) => {
	try {
		const { id } = matchedData(req);
		const cleanData = matchedData(req, { locations: ["body"] });
		const profile = await profile_model.findByPk(id);

		if (!profile) {
			return res.status(404).json({ ok: false, msg: "Perfil no encontrado" });
		}

		await profile.update(cleanData);
		return res.status(200).json({
			ok: true,
			msg: "Perfil actualizado correctamente",
			data: profile
		});
	} catch (error) {
		console.error("Error en updateProfile:", error);
		return res.status(500).json({ ok: false, msg: "Error al actualizar el perfil" });
	}
};

export const deleteProfile = async (req, res) => {
	try {
		const { id } = matchedData(req);
		const profile = await profile_model.findByPk(id);

		if (!profile) {
			return res.status(404).json({ ok: false, msg: "Perfil no encontrado" });
		}

		await profile.destroy();
		return res.status(200).json({ ok: true, msg: "Perfil eliminado correctamente" });
	} catch (error) {
		console.error("Error en deleteProfile:", error);
		return res.status(500).json({ ok: false, msg: "Error al eliminar el perfil" });
	}
};