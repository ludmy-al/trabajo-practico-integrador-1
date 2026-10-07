import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
 
export const article_model =   sequelize.define(
    "article", {

        title:{
            type:DataTypes.STRING(200),
            allowNull: false,
        },
        content: {
            type:DataTypes.TEXT
        },
        excerpt: {
            type:DataTypes.STRING(500)//tiene que ser opcional
        },
        status:{
            type: DataTypes.ENUM('published', 'archived'),
            defaultValue: 'published'
        },
        user_id: {
            type: DataTypes.INTEGER,
            unique: true
        }
    }
)