import ErrorHandler from "../utils/errorHandler.js";

export default (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error"

    //Wrong mongoDB id error
    if(err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`
        err = new ErrorHandler(message,400);
    }

    //Mongooose duplicate key error
    if(err.code === 11000)
    {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400);
    }

    //Wrong JWT error
    if(err.name === "JsonWebTokenError") {
        const message = `JSON Web Token invalid, try again`
        err = new ErrorHandler(message,400);
    }

     //JWT Expire Error
     if(err.name === "TokenExpiredError") {
        const message = `JSON Web Token is Expired, try again`
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        error:err.stack
    })
}


