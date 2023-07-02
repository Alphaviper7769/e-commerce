import express from "express"
import ErrorHandler from "./utils/errorHandler.js";
import errorMiddleware from "./middleware/error.js"

const app = express();
app.use(express.json())

//routes import
import product from "./routes/productRoute.js"




app.use("/api/v1",product)



//Middleware for Error
app.use(errorMiddleware)


export default app;