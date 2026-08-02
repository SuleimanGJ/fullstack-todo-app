import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import { PORT } from "./config/config.js";
import { userRouter } from "./routes/user.router.js";
import { todoRouter } from "./routes/todo.router.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());


app.get("/healthy", (req, res) => {
    res.send("Server is working")
});

app.use("/api/v1/user", userRouter)
app.use("/api/v1/todo", todoRouter)

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
});