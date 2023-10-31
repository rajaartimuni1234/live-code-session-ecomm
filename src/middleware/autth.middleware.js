import User from "../models/user.js"
import JWT from "jsonwebtoken"
import asyncHandler from "../service/asyncHandler.js"
import config from "../config/index.js"
import customError from "../utlis/customError.js"


export const isLoggedIn = asyncHandler(async (req, res, next)=>{
    let token;

    if (req.cookies.token|| (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))){
        token=req.cookies.token || req.headers.authorization.split(" ")[1]
    }

    if (!token){
        throw new customError("Not authorized to access the resources", 401)
    }

    try{
     const decodedJwtPayload= JWT.verify(token, config.JWT_SECRET);
 
     const hitesh= await User.findById(decodedJwtPayload._id, "name email role")
     next()

    }catch(error){
        throw new customError("not authorized to access the resources", 401)
    }


})

export const authorize =(...requiredRoles)=> asyncHandler(async(req, res, next)=>{
    if (!requiredRoles.includes(req.user.role)){
        throw new customError("you are not authorized to access this resourece" ,401)
    }
    next()
})