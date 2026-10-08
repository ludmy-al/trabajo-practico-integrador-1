import { article_model } from "./article.model.js"
import { article_tag_model } from "./articleTag.model.js"
import { profile_model } from "./profile.model.js"
import { tag_model } from "./tag.model.js"
import { user_model } from "./user.model.js"


export const db_relations = () => {
    //relacion 1 a 1
    user_model.hasOne(profile_model, {foreignKey: "user_id", as:'author'})
    profile_model.belongsTo(user_model, {foreignKey: "user_id", as:'user'})
    //1 a muchos
    user_model.hasMany(article_model, {foreignKey: "user_id", as:'articles'})
    article_model.belongsTo(user_model, {foreignKey: "user_id", as:"author"})
    // muchos a muchos
    article_model.belongsToMany(tag_model,{through:article_tag_model, foreignKey:"article_id", as:"tags"})
    tag_model.belongsToMany(article_model,{through:article_tag_model, foreignKey:"tag_id",as: "article"})
     article_tag_model.belongsTo(article_model,{foreignKey:"article_id", as:"article"})
     article_tag_model.belongsTo(tag_model,{foreignKey:"tag_id", as:"tag"})
}

export {
    user_model,
    profile_model,
    article_model,
    tag_model,
    article_tag_model
};