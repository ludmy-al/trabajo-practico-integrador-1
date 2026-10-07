import { body, param } from 'express-validator';

export const validateArticleIdParam = [
    param('id')
        .isInt({ min: 1 }).withMessage('El ID del artículo debe ser un número entero válido')
];

export const NewArticleValidation = [
    body('title')
        .notEmpty().withMessage('El título es obligatorio')
        .isLength({ min: 3, max: 200 }).withMessage('El título debe tener entre 3 y 200 caracteres')
        .trim(),

    body('content')
        .notEmpty().withMessage('El contenido del artículo es obligatorio')
        .isLength({ min: 50 }).withMessage('El contenido debe tener al menos 50 caracteres')
        .trim(),

    body('excerpt').optional()
        .isLength({ max: 500 }).withMessage('El extracto/resumen no puede exceder los 500 caracteres')
        .trim(),

    body('status').optional()
        .isIn(['published', 'archived']).withMessage('El estado debe ser "published" o "archived"'),
    body("user_id")
        .notEmpty().withMessage("El ID del usuario es obligatorio")
        .isInt().withMessage("El ID del usuario debe ser un número entero")
    
];

export const updateArticleValidation = [
    ...validateArticleIdParam,

    body('title').optional()
        .isLength({ min: 3, max: 200 }).withMessage('El título debe tener entre 3 y 200 caracteres')
        .trim(),

    body('content').optional()
        .isLength({ min: 50 }).withMessage('El contenido debe tener al menos 50 caracteres')
        .trim(),

    body('excerpt').optional()
        .isLength({ max: 500 }).withMessage('El extracto no puede exceder los 500 caracteres')
        .trim(),

    body('status').optional()
        .isIn(['published', 'archived']).withMessage('El estado debe ser "published" o "archived"'),
];