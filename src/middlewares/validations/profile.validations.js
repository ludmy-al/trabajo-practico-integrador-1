import { body, param } from "express-validator";
import { profile_model, user_model } from "../../models/index.js";

const profileFields = (optional = false) => {
    const firstName = body("first_name");
    const lastName = body("last_name");

    if (optional) {
        firstName.optional();
        lastName.optional();
    } else {
        firstName.notEmpty().withMessage("El nombre es obligatorio");
        lastName.notEmpty().withMessage("El apellido es obligatorio");
    }

    return [
        firstName
        .isLength({ min: 2, max: 50 }).withMessage("El nombre debe tener entre 2 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El nombre solo debe contener letras")
        .trim(),
        lastName
        .isLength({ min: 2, max: 50 }).withMessage("El apellido debe tener entre 2 y 50 caracteres")
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage("El apellido solo debe contener letras")
        .trim(),
    body("biography").optional()
        .isLength({ max: 500 }).withMessage("La biografía no puede exceder 500 caracteres")
        .trim(),
    body("avatar_url").optional()
        .isURL().withMessage("Debe proporcionar una URL válida para el avatar"),
        body("birth_date").optional()
        .isISO8601().withMessage("La fecha de nacimiento debe ser válida")
    ];
};

export const validateProfileIdParam = [
    param("id").isInt({ min: 1 }).withMessage("El ID del perfil debe ser un número entero válido")
];

export const newProfileValidation = [
    body("user_id")
        .notEmpty().withMessage("El ID del usuario es obligatorio")
        .isInt({ min: 1 }).withMessage("El ID del usuario debe ser un número entero válido")
        .custom(async (userId) => {
            const user = await user_model.findByPk(userId);
            if (!user) throw new Error("El usuario no existe");

            const profile = await profile_model.findOne({ where: { user_id: userId } });
            if (profile) throw new Error("El usuario ya tiene un perfil");
        }),
    ...profileFields()
];

export const updateProfileValidation = [
    ...validateProfileIdParam,
    body("user_id").optional()
        .isInt({ min: 1 }).withMessage("El ID del usuario debe ser un número entero válido")
        .custom(async (userId, { req }) => {
            const user = await user_model.findByPk(userId);
            if (!user) throw new Error("El usuario no existe");

            const profile = await profile_model.findOne({ where: { user_id: userId } });
            if (profile && profile.id !== Number(req.params.id)) {
                throw new Error("El usuario ya tiene otro perfil");
            }
        }),
    ...profileFields(true)
];