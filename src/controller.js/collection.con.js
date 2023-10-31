import collection from "../models/collection";
import collection from "../models/collection";
import asyncHandler from "../service/asyncHandler";
import customError from "../utlis/customError";

//collection controller

export const createCollection= asyncHandler(async(req, res)=>{
    const {name}= req.body;

    if (!name){
        throw new customError ("collection name is required", 400)
    }

    const collection = await collection.create({
        name,

    })

    res.status(200).json({
        success: true,
        message: "collection created Successfully",
        collection
    })
})


//collection Updatioon

export const updateCollection =asyncHandler(async(req, res)=>{
    const {name}=req.body

    const {id: collectionId}=req.params

    if (!name){
        throw new customError ("collection name is required", 400)
    }

    let updatedcollectio =await collection.findByIdAndUpdate(
        collectionId,{
            name,
        },
        {
            new: true,
            runValidators: true,
        }

    )

    if (!updateCollection){
        throw new customError("Collection not found ", 400)
    }

    res.status(200).json({
        success: true,
        message:"Collection updated  successfully",
        collection
    })
})

const deleteCollection= asyncHandler(async(req, res)=>{
    const {id: collectionId}= req.params

    const collectionToDelete= await collection.findById(collectionId)

    if (!collectionToDelete){
        throw new customError("collection not found", 400)
    }

    collectionToDelete.remove();

    res.status(200).json({
    success: true,
    message: "collection  has been deleted successfully"
    })
})


//get all collection

export const getAllcollections = asyncHandler( async(req, res)=>{
     
    const collections=await collection.find()

    if (!collections){
        throw new customError ("No collection founds", 400)
    }

    res.status(200).json({
        success: true,
        collections
    })
})
