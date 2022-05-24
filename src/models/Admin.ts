import {Schema,model,Types} from "mongoose";
import Users from "../Types/Users";

const {ObjectId} = Types;

const adminSchema = new Schema<Users>({
    name:{
        type:String,
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
})

const AdminModel = model<Users>("Admin",adminSchema);
export default AdminModel;