import { body, param } from "express-validator";
import { tag_model } from "../../models/tag.model.js";

const tagNameValidation = (required) => {
	const validation = body("name");

	if (required) {
		validation.notEmpty().withMessage("El nombre de la etiqueta es obligatorio");
	} else {
		validation.optional();
	}

	return validation
		.isLength({ min: 2, max: 30 }).withMessage("La etiqueta debe tener entre 2 y 30 caracteres")
		.matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s_-]+$/).withMessage("La etiqueta contiene caracteres no válidos")
		.trim()
		.custom(async (name, { req }) => {
			const tag = await tag_model.findOne({ where: { name } });
			if (tag && (!req.params.id || tag.id !== Number(req.params.id))) {
				throw new Error("La etiqueta ya existe");
			}
		});
};

export const validateTagIdParam = [
	param("id").isInt({ min: 1 }).withMessage("El ID de la etiqueta debe ser un número entero válido")
];

export const newTagValidation = [tagNameValidation(true)];

export const updateTagValidation = [
	...validateTagIdParam,
	tagNameValidation(false)
];