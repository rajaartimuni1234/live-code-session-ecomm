import asyncHandler from "../service/asyncHandler.js";
import customError from "../utlis/customError.js";
import User from "../models/user.js"


export const cookieOption= {
    expires: new Date(Date.now()+3*24*60*60*1000),
    httpOnly: true
}

// signup
const signup=asyncHandler(async (req, res)=>{
    const {name, email, password}=req.body

    if (!name || !email || ! password){
        throw new customError ("filled all box", 422)
    }

    const userExit= await User.findOne({email: email})

    if (userExit){
     throw new customError ("email is already exit", 400)
    }
  else {
     const user = await User.create({
        name,
        email,
        password
     })

     const token=user.getJWTtoken()

    //safty
    user.password=undefined

    //store the token in cookies

    res.cookie("token", token, cookieOption)

    //send to response to user

    res.status(200).json({
        success: true,
        token, 
        user
    })
  }
})

// login

const login =asyncHandler (async (req, res)=>{
    const {email, password}= req.body

    if (!email || !password){
        throw new customError('filled all box', 422)
    }

    const user=await User.findOne({email: email}).select('+password')

    if (!user){
        throw customError("invaild credentails", 400)
    }

    const passwordCompare= await user.comparePassword(password)

    if (!passwordCompare){
        throw customError("invaild credentails", 400)
    }

    const token =user.getJWTtoken()

    user.password=undefined

 //create cookie
 res.cookie("token", token, cookieOption)
 res.status(200).json({
    success: true,
    token,
    user

 })
})

//logout

const logout= asyncHandler( async(req,res)=>{
 res.cookie('token', null, {
    expires: new Date (Date.now()),
    httpOnly: true
 })

 res.status(200).json({
    success: true,
    message: "loged Out"
 })
})

//get profile

export const getProfile =asyncHandler(async(req, res, next)=>{
    const {user}=req

    if (!user){
        throw new customError("User not found", 401)
    }

    res.status(200).json({
        success: true,
        user
    })
})
