import Product from "../models/products.js";

export const createNewProduct =async(req,res)=>{
   const {title,description,price,imageFile} = req.body;
   try {
       const product =await Product.findOne({name:title});
       if(product)return res.status(404).json({message:"Product already exists."});

       const result = await Product.create({name:title,description:description,price:price,imageFile:imageFile})
       res.status(201).json({ result});
   } catch (error) {
       res.status(500).json({message:"Something went wrong"});
   }
}

export const fetchProducts=async(req,res)=>{
    try {
        const products = await Product.find();
        res.status(200).json({products});
    } catch (error) {
        res.status(500).json({message:"Something went wrong"});
    }
}