import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import {addToCart} from "../actions/auth";
import { useSelector } from 'react-redux';
import "./Product.css";

function Product({id,title,image,price,rating}) {

  const [user, setUser]=useState(JSON.parse(localStorage.getItem("profile")));


    const dispatch = useDispatch();
    const addToBasket=()=>{
      if(user?.result)
        {
        //   dispatch({
        //     type:"ADD_TO_BASKET",
        //     payload:{
        //         id:id,
        //         title:title,
        //         image:image,
        //         price:price,
        //         rating:rating}
           
        // });
          dispatch(addToCart(id,user?.result._id));
      }
        else{;
          alert("Please create an account to buy products");
        }
    };

    return (
        <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>₹</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p>⭐</p>
            ))}
        </div>
      </div>

      <img src={image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
    );
}

export default Product
