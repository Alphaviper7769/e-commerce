import ErrorHandler from "../utils/errorHandler.js";

export default (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "internal server error"

    //Wrong mongoDB id error
    if(err.name === "CastError") {
        const message = `Resource not found. Invalid ${err.path}`
        err = new ErrorHandler(message,400);
    }

    res.status(err.statusCode).json({
        success:false,
        message:err.message,
        error:err.stack
    })
}
