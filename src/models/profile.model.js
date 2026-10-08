import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const profile_model = sequelize.define (
    "profile", {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        first_name: {
            type:DataTypes.STRING(50),
        },
        last_name: {
            type:DataTypes.STRING(50)
        },
        biography: {
            type: DataTypes.TEXT
            //tiene que ser optional acordate
        },
        avatar_url: {
            type: DataTypes.STRING(255)
            //tiene que ser opcional
        },
        birth_date: {
            type:DataTypes.DATE
            //tiene que ser optional
        }
    }
)