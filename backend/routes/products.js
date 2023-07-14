import express from "express";
import {createNewProduct, fetchProducts} from "../controllers/products.js";

const router = express.Router();

router.post("/api/newProduct",createNewProduct);
router.get("/api/fetch-products",fetchProducts);

export default router;