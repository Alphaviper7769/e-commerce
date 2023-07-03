import ErrorHandler from "../utils/errorHandler.js";
import { sendEmail } from "../utils/sendEmail.js";
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

//Logout user
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

//Forget Password
export const forgotPassword = catchAsyncError( async (req,res,next) => {
    
    const user = await User.findOne({email:req.body.email})

    if(!user)
    {
        return next(new ErrorHandler("User not found"),404)
    }


// Get Reset Password token
    const resetToken = user.getResetPasswordToken()

    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = `Your password reset token is :- \n \n  ${resetPasswordUrl} \n \n If you have not requested this email , please ignore`

    try{

        await sendEmail({
            email:user.email,
            subject:`E-Commerce Password Recovery`,
            message,
        });

        sendEmail(sendEmail)

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch(error)
    {
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500))
    }
})