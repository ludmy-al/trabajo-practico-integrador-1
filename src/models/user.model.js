import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const user_model = sequelize.define (
    "user", 
    {
        username: {
                type: DataTypes.STRING(20),
                allownull: false,
                unique: true
            },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        role: {
            type: DataTypes.STRING,
        },
    },
)