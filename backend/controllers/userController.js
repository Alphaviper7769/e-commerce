import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./../middleware/catchAsyncError.js";
import asyncError from "./../middleware/catchAsyncError.js";
import User from "./../models/user.js"
import sendToken from './../utils/jwtToken.js';

//Register a User
export const registerUser = catchAsyncError( async (req,res,next) => {

    const { name,email,password } = req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"sample public_id",
            url:"profile Pic"
        }
    })

    sendToken(user,201,res)
})

//Login User
export const loginUser = catchAsyncError( async (req,res,next)=>{

    const {email , password} = req.body

    //checking if both email and password are present
    if(!email || !password)
    {
        return next("Email/Password not found",400)
    }

    const user = await User.findOne({email}).select("+password");

    if(!user)
    {
        return next(new ErrorHandler("Incorrect email / password",401))
    }

    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched)
    {
        return next(new ErrorHandler("Incorrect email / password",401))
    }

    sendToken(user,201,res)
})

export const logoutUser = catchAsyncError( async (req,res,next) => {

    const options = {
        expires: new Date(
          Date.now()
        ),
        httpOnly: true,
      };

    res.cookie("token",null,options)

    res.status(200).json({
        success:true,
        message:"Logged Out"
    })
})
