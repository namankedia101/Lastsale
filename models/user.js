import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    imageFile:{type:String, required:true},
    rating:{type:Number}
});

const addressSchema = mongoose.Schema({tel: {type:Number},
    pincode:{type:Number},
    name:{type:String},
    state:{type:String},
    address: {type:String}
});

const userSchema = mongoose.Schema({
    name:{type:String},
    contactInfo: {
        email:{type:String,required:true},
        addresses:[addressSchema]
    },
    userCart:[{
        productId:{type:String},
        count: {type:Number, default:0}
    }],
    orders:[{
        orderId:{type:String},
        items:[productSchema],
        amount:{type:Number},
        paymentMethod:{type:String},
        address:{type:addressSchema},
        orderTime:{type:Number},
        deliveryStatus:{type:String},
    }],
    password:{type:String, required:true},
    status:{type:String, default:"pending"},
});

export default mongoose.model("User",userSchema);