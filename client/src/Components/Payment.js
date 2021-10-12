import React, {useEffect, useState} from 'react';
import "./Payment.css";
import CheckoutProduct from './CheckoutProduct';
import Address from './Address';
import { Link, useLocation, useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';
import { getCartItems, getUserAddresses } from '../actions/auth';
import {useDispatch, useSelector} from "react-redux";
import axios from 'axios';
import $ from "jquery";

const loadScript = ()=>{
    
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
}

const _DEV_ = document.domain === "localhost";

function Payment() {
    const {cart,userAddresses} = useSelector((state)=>state.products);
    let redirect_url;

     const dispatch = useDispatch();
     const history = useHistory();

     const [user,setUser] = useState(JSON.parse(localStorage.getItem("profile")));
     
    const getBasketTotal = cart?.reduce((amount, item) => item.price + amount, 0);
    const [deliveryAddress,setAddress] = useState({name:"",
                                                    tel:"",
                                                    state:"",
                                                    pincode:"",
                                                    address:""});

    useEffect(()=>{
        dispatch(getCartItems(user?.result._id));   
        dispatch(getUserAddresses(user?.result._id));
    },[dispatch]);

    $('input:checkbox').off().on("click", function(e) {
        $(".check_class").attr("checked", false); //uncheck all checkboxes
        $(this).attr("checked", true);  //check the clicked one      
        let userAddress=JSON.parse(e.target.value);
        setAddress({name:userAddress.name,tel:userAddress.tel,state:userAddress.state,pincode:userAddress.pincode,address:userAddress.address});          
      });

      $('input:checkbox').on('change', function(e) {
        $('input:checkbox').not(this).prop('checked', false);
    });

    

    const displayRazorpay =async()=>{
        await loadScript();
        const {data} = await axios.post(`https://aqueous-forest-14310.herokuapp.com/user/api/razorpay-order/${user?.result._id}/${getBasketTotal}`);
        const options = {
            "key": _DEV_ ? "rzp_test_CIq090UjfKIztC" : "rzp_test_CIq090UjfKIztC", 
            "amount": data.amount.toString(), 
            "currency": data.currency,
            "description": "Thank you for choosing Amazon",
            "image": "http://pngimg.com/uploads/amazon/amazon_PNG11.png",
            "order_id": data.id, 
            "handler":function(response){
                if (typeof response.razorpay_payment_id == 'undefined' ||  response.razorpay_payment_id < 1) {
                    redirect_url = `/order-failed-page/${response.razorpay_payment_id}`;
                  } else {
                    redirect_url = `/order-success-page/${response.razorpay_payment_id}`;
                    //history.replace("/orders");
                  }
                  window.location.href = redirect_url;
            },
            "notes":{
                "userId":user?.result._id,
                "deliveryAddress":JSON.stringify(deliveryAddress)
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="payment">
            <div className="payment_container">
                <h1>
                    Checkout (<Link to="/checkout">{cart?.length} items</Link>) 
                </h1>
                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment_address">
                        <p>{user?.result.email}</p>
                        <h4>Choose Address</h4>
                        {userAddresses.map((userAddress,index)=>
                            <div >
                            <input type="checkbox" value={JSON.stringify(userAddress)} name={JSON.stringify(userAddress.name)} />
                            <Address  
                            key={index} 
                            name={userAddress.name} 
                            tel={userAddress.tel} 
                            state={userAddress.state} 
                            pincode={userAddress.pincode} 
                            address={userAddress.address} 
                            hidden
                            /> 
                            </div>
                        )}<h3>or</h3>
                        <span><a href="/account-settings/add-new-address">ADD NEW ADDRESS</a></span>
                    </div>
            </div>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment_items">
                    {cart?.map((item,index)=>(
                    <CheckoutProduct 
                        key={index}
                        id={item._id}
                        title={item.name}
                        image={item.imageFile}
                        price={item.price}
                        hideButton
                        //rating={item.rating}
                    />
                ))}
                    </div>
                </div>

                <div className="payment_section">
                    <div className="payment_title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment_details">
                        
                            <div className="payment_priceContainer">
                                <CurrencyFormat
                                renderText={(value)=>(
                                    <>
                                        <h3>Order Total: {value}</h3>
                                    </>
                                )}
                                decimalScale={2}
                                value={getBasketTotal}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₹"}
                                 />
                                 <button onClick={displayRazorpay} target="_blank" href>
                                    <span>Buy Now</span>
                                 </button>
                            </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment
