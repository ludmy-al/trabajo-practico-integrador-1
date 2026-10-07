import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const article_tag_model = sequelize.define(
    "article_tag",
    {
        article_id: {
            unique: true,
            type:DataTypes.STRING
        },
        tag_id: {
            unique: true,
            type:DataTypes.INTEGER
        }
    }
)