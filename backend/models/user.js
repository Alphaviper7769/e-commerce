import mongoose, { Mongoose } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";

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


//Password encryption
userSchema.pre("save",async function(next){

    if(!this.isModified("password"))
    {
        next();
    }

    this.password = await bcrypt.hash(this.password,10)
})

//JWT TOKEN
userSchema.methods.getJWTToken = function() {
    return jwt.sign( {id:this._id} , process.env.JWT_SECRET , {expiresIn: process.env.JWT_EXPIRE})
}

userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
}

export default mongoose.model("User",userSchema)