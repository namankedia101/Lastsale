import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {useDispatch} from "react-redux";
import "./Login.css";
import {signup,signin} from "../actions/auth";

const Login=()=>{
    
    const [form,setForm] =useState({
        email:"",
        password:"",
        name:""
    });
    const [isSignup,setIsSignup] = useState(true);
    const history = useHistory();
    const dispatch = useDispatch();

    const signIn=(e)=>{
        e.preventDefault();
        if(form.email==="" || form.password===""){
            alert("Please enter the asked details");
        }else{
            dispatch(signin(form,history));
        }
    }

    const register=(e)=>{
        e.preventDefault();
        if(form.email==="" || form.password===""){
            alert("Please enter the asked details");
        }else{
            dispatch(signup(form,history));
        }
 
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const clear =()=>{setForm({
        email:"",
        password:"",
        name:""
    })}

    return (
        <div className="login">
        <Link to="/">
            <img 
                className="login_logo"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
                alt=""
            />
        </Link>
        <div className="login_container">
            {isSignup ? <>
                <h1>Sign Up</h1>
            <form autoComplete="off">
                <h5>Name</h5>
                <input name="name" type="text" value={form.name} onChange=
                    {handleChange} required={true}
                />
                <h5>E-mail</h5>
                <input name="email" type="text" value={form.email} onChange=
                    {handleChange} required={true}
                />
                <h5>Password</h5>
                <input name="password" type="password" value={form.password} onChange=
                    {handleChange} required={true} />
            </form>

            <p>By signing-up you agree to AMAZON FAKE 
            CLONE Conditions of Use & Sale. Please
            see our Privacy Notice, our Cookies Notice
            and our Internet-Based Ads Notice</p>
            <button onClick={register} 
            className="login_registerButton">Create your Amazon account</button>
            </>
            :
            <>
            <h1>Sign In</h1>
            <form autoComplete="off">
                <h5>E-mail</h5>
                <input name="email" type="text" value={form.email} onChange=
                    {handleChange} required={true}
                />
                <h5>Password</h5>
                <input name="password" type="password" value={form.password} onChange=
                    {handleChange} required={true} />
                <button type="submit" onClick={signIn} 
                className="login_signInButton">Sign In</button>
            </form>
            </>}
            <p className="isSignUp" onClick={(e)=>{setIsSignup(!isSignup);clear()}}>{isSignup ? "Already have an account? Sign In" : "Don't have an account? Sign Up" }</p>
        </div>
        </div>
    )
}

export default Login
