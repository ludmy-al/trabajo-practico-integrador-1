import { matchedData } from "express-validator";
import { profile_model, user_model } from "../models/index.js";
import { comparePassword, hashPassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";

export const register = async (req, res) => {
    try {
        const data = matchedData(req);
        const { username, email, password, role, ...profileData } = data;

        const existingUser = await user_model.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ ok: false, msg: "El email ya está registrado" });
        }

        const hashedPassword = await hashPassword(password);

        const user = await user_model.create({
            username,
            email,
            password: hashedPassword,
            role: role || "user"
        });

        const profile = await profile_model.create({
            ...profileData,
            user_id: user.id
        });

        return res.status(201).json({
            ok: true,
            msg: "Usuario registrado correctamente",
            data: { user, profile }
        });
    } catch (error) {
        console.error("Error en register:", error);
        return res.status(500).json({ ok: false, msg: "Error al registrar el usuario" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = matchedData(req);

        const user = await user_model.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
        }

        const validPassword = await comparePassword(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ ok: false, msg: "Credenciales inválidas" });
        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            ok: true,
            msg: "Login correcto",
            data: {
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                }
            }
        });
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ ok: false, msg: "Error al iniciar sesión" });
    }
};

export const getAuthProfile = async (req, res) => {
    try {
        const user = await user_model.findByPk(req.user.id, {
            attributes: { exclude: ["password"] },
            include: [{ model: profile_model, as: "profile" }]
        });

        return res.status(200).json({ ok: true, data: user });
    } catch (error) {
        console.error("Error en getAuthProfile:", error);
        return res.status(500).json({ ok: false, msg: "Error al obtener el perfil" });
    }
};

export const updateAuthProfile = async (req, res) => {
    try {
        const data = matchedData(req);
        const profile = await profile_model.findOne({ where: { user_id: req.user.id } });

        if (!profile) {
            return res.status(404).json({ ok: false, msg: "Perfil no encontrado" });
        }

        await profile.update(data);

        return res.status(200).json({
            ok: true,
            msg: "Perfil actualizado correctamente",
            data: profile
        });
    } catch (error) {
        console.error("Error en updateAuthProfile:", error);
        return res.status(500).json({ ok: false, msg: "Error al actualizar el perfil" });
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({ ok: true, msg: "Sesión cerrada correctamente" });
    } catch (error) {
        console.error("Error en logout:", error);
        return res.status(500).json({ ok: false, msg: "Error al cerrar sesión" });
    }
};