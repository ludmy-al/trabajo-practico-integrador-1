import { matchedData } from "express-validator";
import { profile_model } from "../models/profile.model.js";
import { user_model } from "../models/user.model.js";

export const CreateUser = async (req, res) => {

try {
     const validateData = matchedData(req)

    const { username, email, password, role, ...profileData } = validateData
    
    const newUser = await user_model.create({username, email, password, role})

    const newProfile = await profile_model.create({...profileData,user_id:newUser.id})
return res.status(201).json(newProfile)
} catch (error) {
    console.error(error);
    return res.status(500).json({ok:false, msg: "error al intentar crear un nuevo user"})
}

}