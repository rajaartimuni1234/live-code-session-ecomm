import mongoose from "mongoose";

const collectionShchema= new mongoose.Schema(
    {
    name: {
        type : string,
        required: ["true", "Please provde a collection name"],
        Trim: true,
        mixLength : [
            120,
            "collection name should not be more than 120 chars"
        ],
       
    },
      
},
{ timestamps: true }

)