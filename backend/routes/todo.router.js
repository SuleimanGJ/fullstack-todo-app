import express from 'express';
import { createTodo, deleteTodo, getAllTodos, getTodo, updateTodo } from '../controllers/todo.controllers.js';
import { verifyToken } from '../middleware/verifyToken.js';
const todoRouter = express.Router();


todoRouter.get("/:id", getTodo);
todoRouter.get("/", verifyToken, getAllTodos);
todoRouter.post("/", verifyToken, createTodo);
todoRouter.put("/:id", verifyToken, updateTodo);
todoRouter.delete("/:id", verifyToken, deleteTodo);

export { todoRouter };