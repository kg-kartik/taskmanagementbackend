import jwt from "jsonwebtoken";
import {Response,NextFunction} from "express"
import RequestWithUser from "../Types/RequestWithUser";
import Users from "../Types/Users";
import AdminModel from "../models/Admin";

require("dotenv").config();

const secret = process.env.JWT_SECRET;
interface JwtPayload{
    email:String
}

export const requireAdminLogin =  async (req:RequestWithUser, res:Response, next:NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) {
        return res.status(401).json({
            error: "no headers provided",
        });
    }
    //Get the token from Bearer "token"
    const token = authorization.replace("Bearer ", "");
    
    const {email} = jwt.verify(token,secret) as JwtPayload;

    try {
        req.user = await AdminModel.findOne({
            email
        }) as Users

    }catch(e) {
        console.log(e,"err");
    }
  
    next();
    
};