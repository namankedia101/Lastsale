import React, {useState, useEffect} from 'react'
import "./Orders.css";
import Order from "./Order";
import {getUserOrders,getCartItems} from "../actions/auth";
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../actions/products';

const Orders=()=>{   
    
    const dispatch = useDispatch();
    const {orders} = useSelector((state)=>state.products);
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("profile")));
    
     useEffect(()=>{
        dispatch(getUserOrders(user?.result._id));
        dispatch(getCartItems(user?.result._id));
     }, []);
     
    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders_order">
                {orders?.map(order => (
                    <Order key={order._id} order={order}/>
                ))}
            </div> 
        </div>
    )
}

export default Orders
