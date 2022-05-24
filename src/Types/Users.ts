import Todos from "./Todos";

interface Users{
    _id?:string;
    name:string;
    email:string;
    password?:string;
    todo:Todos
}

export default Users;