import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.js";
import { UserModel } from "../models/user.model.js";


const signup = async (req, res) => {
    const {username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }
    
    try {
        const existingUser = await UserModel.findOne({
            $or: [
                { email: email.toLowerCase() },
                { username: username.toLowerCase() }
            ]
        });

        
        if(existingUser){
            return res.status(400).json({ message: "Email or username already exists" })
        }
        
        const userInfo = new UserModel({
            username,
            email: email.toLowerCase(),
            password
        })
        
        await userInfo.save();
        const user = userInfo.toObject()
        delete user.password;

        return res.status(201).json({
            data: user,
            message: "User successfully signed up"
        });
    } catch (error) {
        console.log(`error at singup user ${error}`);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
}

const signin = async (req, res) => {

    const {username, email, password } = req.body;

    // checking inputs
    if (!email || !password) {
        return res.json({message: "All fields are required"})
    }

    try {

        // checking user
        const existingUser = await UserModel.findOne({ email: email.toLowerCase() }).select("+password")

        if(!existingUser){
            return res.status(400).json({message: "Invalid email"})
        }

        // password checking
        const isPasswordMatched = await existingUser.comparePassword(password)
        if(!isPasswordMatched){
            return res.status(400).json({message: "Incorrect password"})
        }

        // expires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hour
        // expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7days

        const expiresIn = 7 * 24 * 60 * 60; // 7d

        // generating token
        const token = jwt.sign(
            { id: existingUser._id },JWT_SECRET, { expiresIn }
        );

        // sending cookies
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            maxAge: expiresIn * 1000,
        });
        // res.cookie("token", token, {
        //     path: "/",
        //     sameSite: "lax",
        //     httpOnly: true,
        //     expires: new Date(Date.now() + 1000 * 24 * 60 * 60),
        // });

        // // For production you'll probably want

        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "lax",
        //     maxAge: expiresIn * 1000,
        // });

        const user = existingUser.toObject();
        delete user.password;

        return res.status(200).json({
            data: user,
            message: "User successfully signed in",
        });

    } catch (error) {
        console.log(`error at singin user ${error.message}`);
        return res.json({
            message: "Something went wrong"
        });
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie("token");

        // // For production you'll probably want
        // // Usually you'll clear with the same options used when setting the cookie:

        // res.clearCookie("token", {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === "production",
        //     sameSite: "lax",
        // });

        return res.status(200).send({ message: "Logged out!" });
    } catch (error) {
        return res.status(500).send({ message: "Error logging out" });
    }
};

const getMe = async (req, res) => {
    const user = await UserModel.findById(req.user.id).select("-password");

    res.status(200).json(user);
};

const updateProfile = async (req, res) => {
    const {username} = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
        req.user.id,
        {username},
        { new: true }
    ).select("-password");

    res.json(updatedUser);
};

export {signup, signin, logout, getMe, updateProfile}