import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from './config/database.js';

//Handling Uncaught Exeption
process.on("uncaughtException",(err)=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shutting down the server due to unhandled Promise Rejection`)
    process.exit(1)
})



//Config
dotenv.config ({path: "backend/config/config.env"})

//connect Database
connectDatabase()

const server = app.listen(process.env.PORT,()=>{

    console.log(`Server is working on ${process.env.PORT}`)
})



//Unhandled Promise Rejection
process.on("unhandledRejection",error => {
    console.log(`Error: ${error.message}`)
    console.log(`Shutting down the server due to unhandled promise rejection`)

    server.close(() => {
        process.exit(1)
    })
})