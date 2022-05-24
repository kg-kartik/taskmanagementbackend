import {Schema,model,Types} from "mongoose";

const {ObjectId} = Types;

const todoSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String
    },
    deadline:{
        type:String
    },
    user:{
        type:ObjectId,
        ref:"UsersModel"
    }
})

const TodoModel = model("Todo",todoSchema);
export default TodoModel;