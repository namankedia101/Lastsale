import React, { useEffect, useState } from 'react';
import {getCartItems} from "../../actions/auth";
import "./Checkout.css";
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import Subtotal from "../Subtotal/Subtotal";
import {useDispatch, useSelector} from "react-redux";

const Checkout=()=>{
    
    const dispatch = useDispatch();
    const [user,setUser] = useState(JSON.parse(localStorage.getItem("profile")));    
    const {cart} = useSelector((state)=>state.products);
    
    useEffect(()=>{
        dispatch(getCartItems(user?.result._id));
    },[dispatch])

    return (
        <div className="checkout">
            <div className="checkout_left">
            <img className="checkout_ad"
             src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
             alt="ad" />
            <div>
                <h3>Hello user</h3>
                <h2 className="checkout_title">
                    Your shopping basket
                </h2>
                {cart?.map((item,index)=>(
                    <CheckoutProduct 
                        key={index}
                        id={item._id}
                        title={item.name}
                        image={item.imageFile}
                        price={item.price}
                        //rating={item.rating}
                    />
                ))}
            </div>
            </div>
            <div className="checkout_right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
