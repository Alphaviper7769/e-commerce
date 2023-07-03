import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt from 'jsonwebtoken';
import User from "./../models/user.js"

export const isAuthenticated = catchAsyncError(async (req,res,next) => {

    const token = req.cookies.token;

    if(!token)
        return next(new ErrorHandler("Please login first",401))

    const decodedData = jwt.verify(token,process.env.JWT_SECRET)

    req.user = await User.findById(decodedData.id);

    next()

})