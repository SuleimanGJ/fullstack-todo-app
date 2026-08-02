import mongoose from "mongoose";


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const TodoSchema = new Schema({
    title: { 
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {type: ObjectId, ref: "User"}
}, {timestamps: true});


const TodoModel = mongoose.model("Todo", TodoSchema);

export {TodoModel}