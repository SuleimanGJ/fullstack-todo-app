import { TodoModel } from "../models/todo.model.js";
import { UserModel } from "../models/user.model.js";

const getAllTodos = async (req, res) => {
    try {
        const todos = await TodoModel.find({userId: req.user.id})
        return res.json({
            data: todos,
            message: "Todos fetched successfully"
        });
    } catch (error) {
        console.log(`Error something went wrong ${error.message}`)
        return res.json({
            message: "Error something went wrong"
        });
    }
}
const getTodo = async (req, res) => {
    const userId = req.user.id;
    const id = req.params.id
    try {
        const todos = await TodoModel.findById({_id: id, userId: userId})
        return res.json({
            data: todos,
            message: "Todo fetched successfully"
        });
    } catch (error) {
        console.log(`Error something went wrong ${error.message}`)
        return res.json({
            message: "Error something went wrong"
        });
    }
}


const createTodo = async (req, res) => {
    const userId = req.user.id
    
    try {
        const user = await User.findById({userId})
        if(!user){ return res.json({message: "User not found"})}

        const {title, description, completed} = req.body;
    
        if (!title || !description){ return res.json({message: "Invalid inputs"}) }

        const todos = await TodoModel({ title, description, completed, userId })
        await todos.save();

        return res.json({
            data: todos,
            message: "Todo created successfully"
        });
    } catch (error) {
        console.log(`Error something went wrong ${error.message}`)
        return res.json({
            message: "Error something went wrong"
        });
    }
}

const updateTodo = async (req, res) => {
    const userId = req.user.id

    try {
        const user = await User.findById({ userId })
        if (!user) { return res.json({ message: "User not found" }) }

        const id = req.params.id;
        const todo = await TodoModel.findById({_id: id});
        if(!todo) return res.status.json({message: "Todo not found"});

        const {title, description, completed} = req.body;
        if (!title || !description){ return res.json({message: "Invalid inputs"}) }

        if (todo.owner.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized access to update todo!" });
        }
        
        todo.title = title;
        todo.description = description;
        todo.completed = completed;

        const updatedTodo = await todo.save();

        return res.json({
            data: updatedTodo,
            message: "Todo updated successfully"
        });
    } catch (error) {
        console.log(`Error something went wrong ${error.message}`)
        return res.json({
            message: "Error something went wrong"
        });
    }
}
const deleteTodo = async (req, res) => {
    const userId = req.user.id
    const id = req.params.id;

    try {
        const user = await User.findById({ userId })
        if (!user) { return res.json({ message: "User not found" }) }

        const todo = await TodoModel.findById({_id: id});
        if(!todo) return res.status.json({message: "Todo not found"});

        if (todo.owner.toString() !== userId) {
            return res.status(403).json({ message: "Unauthorized access to update todo!" });
        }

        const deletedTodo = await TodoModel.findByIdAndDelete({id})

        return res.json({
            data: deletedTodo,
            message: "Todo deleted successfully"
        });
    } catch (error) {
        console.log(`Error something went wrong ${error.message}`)
        return res.json({
            message: "Error something went wrong"
        });
    }
}





export { getAllTodos, getTodo, createTodo, updateTodo, deleteTodo }