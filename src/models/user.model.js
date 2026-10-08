import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const user_model = sequelize.define(
    "user",
    {
        username: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
            validate: {
                len: [3, 20]
            }
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("user", "admin"),
            defaultValue: "user"
        }
    },
    {
        paranoid: true,
        timestamps: true
    }
)