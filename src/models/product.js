import mongoose from "mongoose";

const productSchema= new mongoose.Schema({

    name: {
        type: String,
        required:[true, "please prodive a product name"],
        trim:true,
        maxLength:[120, "product name should not be more than 120"]
    },

    price: {
        type: Number,
        required: [true, "please provide the product prices"],
    
    },
    description: {
        type: String
    },

    photos: [
        {
            secure_url: {
                type: String,
                required:true
            }
        }
    ],

    stock: {
        type:Number,
        default:0
    },
    collectionId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Collection"
    }

},
{timestamps:true})

export default mongoose.model("Product", productSchema)