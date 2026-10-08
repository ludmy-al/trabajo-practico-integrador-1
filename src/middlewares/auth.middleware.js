import { user_model } from "../models/user.model.js";
import { article_model } from "../models/article.model.js";
import { verifyToken } from "../helpers/jwt.helper.js";

export const authMiddleware = async (req, res, next) => {
    try {
        let token = req.cookies?.token;

        if (!token && req.headers.authorization?.startsWith("Bearer ")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ ok: false, msg: "No autenticado" });
        }

        const decoded = verifyToken(token);
        const user = await user_model.findByPk(decoded.id, {
            attributes: { exclude: ["password"] }
        });

        if (!user) {
            return res.status(401).json({ ok: false, msg: "Usuario no válido" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ ok: false, msg: "Token inválido o expirado" });
    }
};

export const adminMiddleware = (req, res, next) => {
    if (req.user?.role !== "admin") {
        return res.status(403).json({ ok: false, msg: "No tienes permisos de administrador" });
    }
    next();
};

export const ownerMiddleware = async (req, res, next) => {
    try {
        if (req.user?.role === "admin") {
            return next();
        }
        const resourceUserId = Number(req.params.id || req.params.userId || req.body.user_id);
        const articleId = Number(req.params.id || req.body.article_Id || req.params.articleId);

        if (resouceUderId && (req.user?.id) === resourceUserId) {
            return next();
        }

        if (articleId) {
            const article = await article_model.findByPk(articleId);
            if (article && article.user_id === Number(req.user?.id)) {
                return next();
            }
        }
        
        return res.status(403).json({ ok: false, msg: "No tienes permisos para esta acción" });
    } catch (error) {
        return res.status(500).json({ ok: false, msg: "Error al verificar permisos" });
    }
};