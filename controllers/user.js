import User from "../models/user.js";
import Product from "../models/products.js";
import Order from "../models/orders.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { razorpay } from "../razorpay.js";
import shortid from "shortid";
import dotenv from "dotenv";

dotenv.config();

export const signUp =async(req,res)=>{
    const {email, password,name} = req.body;

    try {
        const existingUser = await User.findOne({"contactInfo.email":email});
 
        if(existingUser) return res.status(404).json({message:"User already exists."});
       // if(password!==confirmPassword) return res.status(404).json({message:"Passwords don't match."});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({name:name,contactInfo:{email : email},password:hashedPassword,status:"pending"});

        const token = jwt.sign({email:result.contactInfo.email, id:result._id}, "test", {expiresIn:"7d"});

        res.status(201).json({ result, token });

    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}

export const signIn =async(req,res)=>{
    const {email,password,name} = req.body;

    try{
        const existingUser = await User.findOne({"contactInfo.email":email});
        if(!existingUser) return res.status(404).json({message:"User doesn't exist. Please create account"});
        
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect) return res.status(404).json({message:"Password is incorrect!"});
     
        const token = jwt.sign({email:existingUser.contactInfo.email, id:existingUser._id},"test",{expiresIn:"7d"});
        res.status(200).json({result:existingUser, token});
    }catch{
        res.status(500).json({message:"Something went wrong"});
    }
}

export const addToCart=async(req,res)=>{
    const {id,userId} = req.params;
    try{
        let existingUser =await User.findById(userId);
        const productIndex= existingUser.userCart.findIndex(p=>p.productId===id);
        if(productIndex > -1){
            let item =existingUser.userCart[productIndex];
            item.count = count;
            existingUser.userCart[productIndex] = item;
            existingUser = await existingUser.save();
        }else{
            existingUser.userCart.push({productId:id,count:1});
            await existingUser.save();
        }
        res.status(201).json({result:existingUser.userCart});

    }catch{
        res.status(500).json({message:"Something went wrong!"});
    }
}

export const removeFromCart =async(req,res)=>{
    const {id,userId} = req.params;
    try{
        let existingUser =await User.findById(userId);
        const productIndex= existingUser.userCart.findIndex(p=>p.productId===id);

        if(productIndex > -1){
           existingUser =await User.findByIdAndUpdate({"_id":userId},{"$pull":{"userCart":{"productId":id}}}, { safe: true, upsert: true });
           // existingUser = await existingUser.save();
        }
        res.status(201).json({result:existingUser.userCart});
    }catch{
        res.status(500).json({message:"Something went wrong!"});
    }
}

export const getCartItems=async(req,res)=>{
    const {userId} = req.params;
    try{
        const existingUser=await User.findById(userId);
        const productIds = existingUser.userCart;
        let result=[];
        for(let i=0; i<productIds.length; i++){
            let product = await Product.findById(productIds[i].productId);
            result.push(product);
        }
        res.status(201).json({result})
    }catch(error){
        res.status(500).json({message:"Something went wrong!"});
    }
}

export const razorpayOrder=async(req,res)=>{
    const {amount} =req.params;
    const payment_capture=1;
    const currency="INR";

    const options={
        amount:(amount*100),
        currency,
        receipt:shortid.generate(),
        payment_capture
    }
    try{
    const response =await razorpay.orders.create(options);
    res.json({id:response.id,currency:response.currency,amount:response.amount})
    }catch(error){
        console.log(error)
    }
}

export const placeOrder=async(userId,order_id,productIds,amount,method,deliveryAddress,created_at)=>{
    const order =await Order.create({customerId:userId,orderId:order_id,amount:amount,items:productIds,orderDate:created_at,address:deliveryAddress,paymentMethod:method})
}

export const razorpayVerification = async(req,res)=>{
    const secret = process.env.RAZORPAY_VERIFICATION_SECRET;
    const shasm = crypto.createHmac("sha256",secret)
    shasm.update(JSON.stringify(req.body));
    const digest = shasm.digest("hex");

    const {order_id,amount,method,created_at} =req.body.payload.payment.entity;
    const {userId,deliveryAddress} = req.body.payload.payment.entity.notes;
    try{
        if(digest===req.headers["x-razorpay-signature"]){
        const existingUser=await User.findById(userId);
        const productIds = existingUser.userCart;
        let result=[];
        for(let i=0; i<productIds.length; i++){
            let product = await Product.findById(productIds[i].productId);
            result.push(product);
        }
        placeOrder(userId,order_id,productIds,amount,method,deliveryAddress,created_at);
        existingUser.orders.push({orderId:order_id, items:result ,amount:amount,paymentMethod:method,address:JSON.parse(deliveryAddress),orderTime:created_at});
        existingUser.updateOne({ $set: { userCart: [] }}, function(err, affected){
            return;
        });
        
        await existingUser.save();
        res.status(200).json({status:"ok"});

      }
    }
    catch(error){
        res.status(500).json({message:"Something went wrong!"});
    }
}

export const getUserOrders=async(req,res)=>{
    const {userId} = req.params;
    try{
        const existingUser=await User.findById(userId);
        const result = existingUser.orders;
        result.reverse();
        res.status(201).json({result})
    }catch(error){
        res.status(500).json({message:"Something went wrong!"});
    }
}

export const addNewAddress=async(req,res)=>{
    const {userId} = req.params;
    const {name,mobileNumber,state,pincode,address} = req.body;

    try{
        const existingUser = await User.findById(userId);
        existingUser.contactInfo.addresses.push({tel:mobileNumber,pincode:pincode,state:state,name:name,address:address});
        await existingUser.save();
        res.status(200).json({result:existingUser.contactInfo.addresses});
    }catch(error){
        res.status(500).json({message:"Something went wrong!"});
    }
}

export const getUserAddresses=async(req,res)=>{
    const {userId} = req.params;
    try {
        const existingUser = await User.findById(userId);
        res.status(200).json({result:existingUser.contactInfo.addresses});
    } catch (error) {
        res.status(500).json({message:"Something went wrong!"});
    }
}