import express from "express";
import {signIn, signUp, addToCart, removeFromCart, getCartItems, razorpayOrder, razorpayVerification, getUserOrders, addNewAddress, getUserAddresses} from "../controllers/user.js";

const router = express.Router();

router.post("/api/signin", signIn);
router.post("/api/signup", signUp);

router.patch("/api/add/usercart/:id/:userId",addToCart);
router.patch("/api/remove/usercart/:id/:userId",removeFromCart);
router.get("/api/get-cart-items/usercart/:userId",getCartItems);
router.get("/api/get-user-orders/userorders/:userId",getUserOrders);
router.post("/api/razorpay-order/:userId/:amount",razorpayOrder);
router.post("/api/razorpay-order-verification",razorpayVerification);
router.post("/api/add/user-new-address/:userId",addNewAddress);
router.get("/api/get-user-addresses/:userId",getUserAddresses);

export default router;