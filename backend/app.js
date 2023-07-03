import express from "express"
import ErrorHandler from "./utils/errorHandler.js";
import errorMiddleware from "./middleware/error.js"
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json())
app.use(cookieParser())

//routes import
import product from "./routes/productRoute.js"
import user from "./routes/userRoute.js"


app.use("/api/v1",product)
app.use("/api/v1",user)



//Middleware for Error
app.use(errorMiddleware)


export default app;