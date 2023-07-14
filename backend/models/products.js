import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    imageFile:{type:String, required:true},
    rating:{type:Number}
});

export default mongoose.model("Product",productSchema);