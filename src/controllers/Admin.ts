import {Request,Response,NextFunction} from "express";
import ApiResponse from "../Types/ApiResponse";
import Users from "../Types/Users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/ErrorResponse";
import AdminModel from "../models/Admin";

export const signup  = (req:Request,res:Response,next:NextFunction) => {
    
    const userDetails = req.body;   
    const secret = process.env.JWT_SECRET;

    AdminModel.findOne({
        email:req.body.email
    }).then((user) => {
        if(user){
            return next(new ErrorResponse("User already exists",400));
        }
        else{

            bcrypt.hash(req.body.password,10)
            .then((hashedPass) => {

                const newUser = new AdminModel({
                    ...userDetails,
                    password:hashedPass
                });
        
                newUser.save()
                .then((user) => {
            
                    const response:ApiResponse = {
                        data:user,
                        status:200,
                        success:true,
                        message:'User successfully registered'
                    }
            
                    res.status(200).json(response);
                }).catch(next);
            });
        }
    })
}

export const login = (req:Request,res:Response,next:NextFunction) => {
    const {email,password} = req.body;

    console.log(email);

    const secret = process.env.JWT_SECRET;

    AdminModel.findOne({
        email
    }).then((user:Users) => {
        if(user) {
            
            const token = jwt.sign({
                email:user.email
            },secret);

            bcrypt.compare(password,user.password)
            .then((isMatch) => {
                
                if(isMatch) {
                    const response:ApiResponse = {
                        success:true,
                        status:200,
                        message:"User successfully logged in",
                        data:{
                            user,
                            token
                        }
                    }
        
                    res.status(200).json(response);
                }
                else{
                    return next(new ErrorResponse("Sorry Incorrect Password/Email",400));
                }
            })

        } else{
            return next(new ErrorResponse("User with email address doesnt exist",400));
        }       
    }).catch(next);
}




