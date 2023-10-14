import mongoose from "mongoose";
import Authroles from "./utlis/authroles.js";
import bcrypt from "bcryptjs"
import e from "express";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxLength: [50, "name must be less than 50 char"]
    },
    email: {
        type:String,
        required: [true, "Name is reqired"],
        lowercase: true 
    },
 
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "At least 8"],
        select: false,
    },

  role: {
      type: String,
      enum: Object.values(Authroles),
      default: Authroles.USER,
  },
  
  fotgotpasswordToken: String,
  fotgotpasswordExpiredData: Date
},
{timestamps: true}
)

//Encrypt the password before saving: Hooks

userSchema.pre("save", async function (next){
    if (!this.isModified('password')) return next()
    this.password=await bcrypt.hash(this.password, 10)
next()
})

userSchema.method= {
    //compare password

    comparePassword: async function (enterPasssword){
        return await bcrypt.compare(enterPasssword, this.password)
    }
}

export default userSchema;