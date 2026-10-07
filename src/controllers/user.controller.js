import { profile_model } from "../models/profile.model.js";
import { user_model } from "../models/user.model.js";

//username email password role USER MODEL
//user_id  first_name last_name biography avatar_url birth_date PROFILE MODEL
export const CreateUser = async (req, res) => {

try {
    
    const { username, email, password, role, first_name, last_name, biography, avatar_url, birth_date } = req.body

    const newUser = await user_model.create({username, email, password, role})

    const newProfile = await profile_model.create({
        user_id: newUser.id, first_name, last_name, biography, avatar_url, birth_date})

    return res.status(201).json({
        user:newUser,
        profile:newProfile,
    });
} catch (error) {
    console.error(error);
    return res.status(500).json({ok:false, msg: "error al intentar crear un nuevo user"})
}

}