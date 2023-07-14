import axios from "axios";

const API = axios.create({baseURL:"http://localhost:5000"});
API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
  
    return req;
  });

export const createNewProduct = (formData)=>API.post("/products/api/newProduct",formData);
export const fetchProducts =()=>API.get("/products/api/fetch-products");

export const signUp = (formData)=>API.post("/user/api/signup", formData);
export const signIn = (formData)=>API.post("/user/api/signin", formData);
export const verifyUser =(verifyData)=> API.post("/user/api/auth/verification/verify-account", verifyData);

export const addToCart=(id,userId) =>API.patch(`/user/api/add/usercart/${id}/${userId}`);
export const removeFromCart=(id,userId) =>API.patch(`/user/api/remove/usercart/${id}/${userId}`);
export const getCartItems=(userId)=>API.get(`/user/api/get-cart-items/usercart/${userId}`);
export const getUserOrders=(userId)=>API.get(`/user/api/get-user-orders/userorders/${userId}`);
export const addNewAddress=(userId,formData)=>API.post(`/user/api/add/user-new-address/${userId}`,formData);
export const getUserAddresses=(userId)=>API.get(`/user/api/get-user-addresses/${userId}`);
