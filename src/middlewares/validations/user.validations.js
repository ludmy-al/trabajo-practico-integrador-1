import { body, param } from "express-validator";
import { user_model } from "../../models/user.model.js";

export const newUserValidation = [
    //estas son las validaciones de user
    body('username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio')
    .isLength({min: 3,max: 20}).withMessage('El username debe tener entre 3 y 20 caracteres')
    .isAlphanumeric().withMessage('El username solo debe contener letras y números')
    .custom(async (username) => {
            const user = await user_model.findOne({ where: { username } });
            if (user) throw new Error('El nombre de usuario ya está en uso');
        }),

    body('email')
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('Debe proporcionar un email válido')
        .custom(async (email) => {
            const user = await user_model.findOne({ where: { email } });
            if (user) throw new Error('El correo electrónico ya está registrado');
        }),

    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('La contraseña debe contener al menos una mayúscula, una minúscula y un número'),
    
    body('role').optional()
        .isIn(['user', 'admin']).withMessage('El rol no es válido'),

    //estas son las validaciones de profile 
    body('first_name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('El nombre debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El nombre solo debe contener letras'),
    body('last_name')
        .notEmpty().withMessage('El apellido es obligatorio')
        .isLength({ min: 2, max: 50 }).withMessage('El apellido debe tener entre 2 y 50 caracteres')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/).withMessage('El apellido solo debe contener letras'),
    body('biography').optional()
        .isLength({ max: 500 }).withMessage('La biografía no puede exceder 500 caracteres'),
    body('avatar_url').optional()
        .isURL().withMessage('Debe proporcionar una URL válida para el avatar')

    ]