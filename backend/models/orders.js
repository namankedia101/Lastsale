import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    customerId:{type:String, required:true},
    orderId:{type:String,required:true},   
    amount:{type:String,required:true},
    items:[{
        productId:{type:String},
        count: {type:Number, default:0}
    }],
    orderDate:{type:Date, default: new Date()},
    address:{type:String,required:true},
    paymentMethod:{type:String,required:true},
    status:{type:String, default:"pending"},
});

export default mongoose.model("Order",orderSchema);