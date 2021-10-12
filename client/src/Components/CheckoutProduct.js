import React, {useState} from 'react';
import "./CheckoutProduct.css";
import { useDispatch } from "react-redux";
import { removeFromCart } from '../actions/auth';

function CheckoutProduct({id,image,title,price,rating,hideButton}) {
    const [user, setUser]=useState(JSON.parse(localStorage.getItem("profile")));

    const dispatch = useDispatch();

    const removeFromBasket=()=>{
        dispatch(removeFromCart(id,user?.result._id));
    }
    
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct_image" alt="" src={image}/>
            <div className="checkoutProduct_info">
                <p className="checkoutProduct_title">{title}</p>
                <p className="checkoutProduct_price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct_rating">
                    {Array(rating)
                    .fill()
                    .map((_,i)=>(
                        <p>⭐</p>
                    ))}
                </div>
                {!hideButton && (
                    <button onClick={removeFromBasket}>Remove from basket</button>
                )}                
            </div>
        </div>
    )
}

export default CheckoutProduct
