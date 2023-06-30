import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import {useHistory} from "react-router-dom";
import { getCartItems, addNewAddress } from '../../actions/auth';
import "./AddressForm.css";

const AddressForm = () => {

    const [user,setUser] = useState(JSON.parse(localStorage.getItem("profile")));    
    const dispatch = useDispatch();
    const history =useHistory();

    useEffect(()=>{
        dispatch(getCartItems(user?.result._id));
    },[]);

    const [form,setForm] =useState({
        name:"",
        mobileNumber:"",
        state:"",
        pincode:"",
        address:""
    }); 

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(form.name==="" || form.mobileNumber==="" || form.state==="" || form.pincode==="" || form.address==="" ){
            alert("Please enter all the required details");
        }else if(form.mobileNumber.length < 10 || form.mobileNumber.length >10 ){
            alert("Enter a valid Mobile No.");
        }else if(form.pincode.length < 6 || form.pincode.length >6 ){
            alert("Enter a valid Pincode");
        }else{
            let result= window.confirm("Are you sure to add a new address?");
                if(result){
                 dispatch(addNewAddress(user?.result._id,form,history));
                }
        }
    }

    return (
        <div className="addressBody">
        <div className="addressForm">
            <h1>New Address</h1>
            <form autoComplete="off">
                <h3>Name</h3>
                <input name="name" value={form.name} onChange={handleChange} type="text" required/>
                <h3>Mobile Number</h3>
                <input name="mobileNumber" value={form.mobileNumber} onChange={handleChange} type="tel" placeholder="+91" required />
                <h3>State</h3><input name="state" value={form.state} onChange={handleChange} type="text" required />
                <h3>Pincode</h3><input name="pincode" value={form.pincode} onChange={handleChange} type="tel" required />
                <h3>Address Line (Flat No., Street, locality, etc.)</h3>
                <textarea name="address" value={form.address} onChange={handleChange} type="text" required />
            </form>
            <button className="addressSubmit" type="submit" onClick={handleSubmit}>Submit</button>
        </div>
        </div>
    )
}

export default AddressForm;