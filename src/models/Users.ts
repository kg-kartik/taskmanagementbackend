import {Schema,model,Types} from "mongoose";
import Users from "../Types/Users";

const {ObjectId} = Types;

const usersSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    todo:{
        type:ObjectId,
        ref:"TodoModel"
    }
})

const UsersModel = model("Users",usersSchema);
export default UsersModel;