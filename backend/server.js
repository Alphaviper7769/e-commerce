import app from "./app.js";
import dotenv from "dotenv";
import connectDatabase from './config/database.js';

//Config
dotenv.config ({path: "backend/config/config.env"})

//connect Database
connectDatabase()

app.listen(process.env.PORT,()=>{

    console.log(`Server is working on ${process.env.PORT}`)
})