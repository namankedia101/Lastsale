import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAddresses, getCartItems } from '../actions/auth';
import Address from './Address';
import "./Account.css"

export const Account = () => {

    const [user,setUser] = useState(JSON.parse(localStorage.getItem("profile")));    
    const dispatch = useDispatch();
    const {userAddresses} = useSelector((state)=>state.products);

    useEffect(()=>{
        dispatch(getUserAddresses(user?.result._id));
        dispatch(getCartItems(user?.result._id));
    },[dispatch]);

    return (
        <div className="accountPage">
        <div className="addressesContainer">
        <h1>Your Addresses:</h1>
        <div className="addresses">
            {userAddresses.map((userAddress,index)=>(
                <div className="address">
                <Address key={index} name={userAddress.name} tel={userAddress.tel} state={userAddress.state} pincode={userAddress.pincode} address={userAddress.address} />
                </div>))}
            <div><span><a href="/account-settings/add-new-address">ADD NEW ADDRESS</a></span></div>
        </div>
        </div>
        </div>
    )
}
