import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./../middleware/catchAsyncError.js";
import asyncError from "./../middleware/catchAsyncError.js";
import User from "./../models/user.js"

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

    res.status(201).json({
        success:true,
        user
    })
})