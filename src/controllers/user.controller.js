import { matchedData } from "express-validator";
import bcrypt from "bcryptjs";
import { profile_model } from "../models/profile.model.js";
import { user_model } from "../models/user.model.js";
import { article_model } from "../models/article.model.js";

export const CreateUser = async (req, res) => {

    try {
        const validateData = matchedData(req)

        const { username, email, password, role, ...profileData } = validateData
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await user_model.create({
            username, 
            email, 
            password: hashedPassword,
            role
        })

        const newProfile = await profile_model.create({
            ...profileData,
            user_id: newUser.id
        });

        return res.status(201).json({
            ok: true,
            msg: "usuario creado correctamente",
            data: {
                user: {
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role
                },
                profile: newProfile
            }
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ok:false, msg: "error al intentar crear un nuevo user"})
    }

};

export const getAllUsers = async (req, res) => {
    try {
        const users = await user_model.findAll({
            attributes: { exclude: ['password'] },
            include: [
                {
                    model: profile_model,
                    as: 'profile'
                }
            ]
        });

        return res.status(200).json({
            ok: true,
            data: users
        });
    } catch (error) {
        console.error("Error en getAllUsers:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al intentar obtener los usuarios"
        });
    }
};


export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await user_model.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [
                { model: profile_model, as: 'profile' },
                { model: article_model, as: 'articles' }
            ]
        });

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            ok: true,
            data: user
        });
    } catch (error) {
        console.error("Error en getUserById:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al obtener el usuario"
        });
    }
};

export const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const validateData = matchedData(req);

        const { username, email, password, role, ...profileData } = validateData;

        const user = await user_model.findByPk(id, {
            include: [{ model: profile_model, as: 'profile' }]
        });

        if (!user) {
            return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
        }

        const updateData = { 
            username,
            email, 
            role
        };

        if (password) {
            updateData.password = await bcrypt.hash(password, 10);
        }

        await user.update(updateData);

        if (user.profile) {
            await user.profile.update(profileData);
        }

        return res.status(200).json({
            ok: true,
            msg: "Usuario y perfil actualizados",
            data: user
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ ok: false, msg: "Error al actualizar usuario" });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await user_model.findByPk(id);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no encontrado"
            });
        }

        await user.destroy();

        return res.status(200).json({
            ok: true,
            msg: "Usuario eliminado correctamente (eliminación lógica)"
        });
    } catch (error) {
        console.error("Error en deleteUser:", error);
        return res.status(500).json({
            ok: false,
            msg: "Error al eliminar el usuario"
        });
    }
}