import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import { UserModel } from "../models/user.model.js";


const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;

    console.log("error at token"+ token)

    if (!token) {
        return res.status(401).json({ message: "Unauthorized, Access denied please login" });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log("error at decoded" + decoded)
        req.user = await UserModel.findOne({_id: decoded.id})
        next();
        
    } catch (error) {
        res.status(401).json({ message: "Token is missing" })
    }


}

export { verifyToken};