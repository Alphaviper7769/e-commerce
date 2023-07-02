import mongoose, { Mongoose } from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"please enter your name"],
        maxLength : [30,"name cannot exeed 30 characters"],
        minLength: [4,"name more than 4 characters"]
    },
    email:{
        type:String,
        required:[true, "please enter your email"],
        unique:true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password:{
        type:String,
        required:[true, "please enter a password"],
        minLength:[5,"please enter a longer password"],
        select:false,
    },
    avatar: {
        public_id:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    createdAt:{
        type:Date,
        default:Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
})

export default mongoose.model("User",userSchema)