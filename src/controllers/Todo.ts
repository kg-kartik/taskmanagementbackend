import {Request,Response,NextFunction} from "express";
import ApiResponse from "../Types/ApiResponse";
import UsersModel from "../models/Users";
import ErrorResponse from "../utils/ErrorResponse";
import TodoModel from "../models/Todo";
import RequestWithUser from "../Types/RequestWithUser";

export const todoAdd  = (req:Request,res:Response,next:NextFunction) => {
    
    const todoDetails = req.body;   

        
        const newtodo = new TodoModel(req.body);

        newtodo.save()
        .then((todo:any) => {
    
            console.log(todo,"todo");

            console.log(todoDetails.user);

            UsersModel.findByIdAndUpdate({
                _id:todoDetails.user
            },{
                todo:todo
            },
            {
                new:true,
                runValidators:true
            }).then((updatedUser) => {

                const response:ApiResponse = {
                    data:updatedUser,
                    status:200,
                    success:true,
                    message:'Todo successfully made'
                }
                res.status(200).json(response);
            }).catch(next);


        }).catch(next);

}

export const submitTodo = (req:RequestWithUser,res:Response,next:NextFunction) => {
    
    const {todoId,file} = req.body; 
    

        TodoModel.findByIdAndUpdate({
            _id:todoId
        },{
            file
        },{
            new:true,
            runValidators:true
        }).then((todo) => {

            UsersModel.findByIdAndUpdate({
                _id:req.user._id
            },{
                todo:todo
            },
            {
                new:true,
                runValidators:true
            }).then((updatedUser) => {

                const response:ApiResponse = {
                    data:updatedUser,
                    status:200,
                    success:true,
                    message:'Todo successfully made'
                }
                res.status(200).json(response);
            }).catch(next);

        }).catch(next);
}





