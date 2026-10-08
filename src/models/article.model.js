import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { article_tag_model } from "./articleTag.model.js";
 
export const article_model = sequelize.define(
    "article", {

        title:{
            type: DataTypes.STRING(200),
            allowNull: false,
            validate: {
                len: [3, 200]
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [50, 20000]
            }
        },
        excerpt: {
            type: DataTypes.STRING(500),
        },
        status:{
            type: DataTypes.ENUM("published", "archived"),
            defaultValue: "published"
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        hooks: {
            afterDestroy: async (article, options) => {
                await article_tag_model.destroy({
                    where: { article_id: article.id },
                    transaction: options.transaction
                });
            }
        }
    }
)