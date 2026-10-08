import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const tag_model = sequelize.define(
    "tag", 
    {
        name:{
            type:DataTypes.STRING(30),
            allowNull: false,
            unique: true,
            validate: {
                len: [2, 30]
            }
        }
    }
)