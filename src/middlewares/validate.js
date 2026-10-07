import { validationResult } from "express-validator";

const validate = (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()){
        const custom = erros.formatWith((err)=>{
            return `${err.path}: ${err.msg}`
        });
        return res.status(400).json(custom.array());
    }
    next()
};