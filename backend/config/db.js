import mongoose from "mongoose";
import { MONGO_URI } from "./config.js";

export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log(`Database connection successfully`);
    } catch (error) {
        console.log(`Database connection failed`);
        process.exit(1);
    }
}