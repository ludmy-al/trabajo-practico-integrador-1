import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const article_tag_model = sequelize.define(
    "article_tag",
    {
        article_id: {
           type: DataTypes.INTEGER,
            allowNull: false,
        },
        tag_id: {
              type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
    {
        indexes: {
            unique: true,
            fields: ["article_id", "tag_id"]
        }
    }
);