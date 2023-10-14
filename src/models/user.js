import mongoose from "mongoose";
import Authroles from "./utlis/authroles.js";
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

export default userSchema;