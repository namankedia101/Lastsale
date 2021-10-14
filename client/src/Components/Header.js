import React, {useEffect, useState} from 'react';
import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link, useHistory, useLocation } from 'react-router-dom';
import decode from "jwt-decode";
import { useDispatch, useSelector } from 'react-redux';

const Header=()=> {
   const [user, setUser]=useState(JSON.parse(localStorage.getItem("profile")));
   const {cart} = useSelector((state)=>state.products);

   const dispatch = useDispatch();
   const location = useLocation();
   const history = useHistory();

   const logout=async()=>{
    let result= window.confirm("Do you really want to logout?");
    if(result===true){
       setUser(null);
       await dispatch({type:"LOGOUT"});
       await dispatch({type:"REMOVE_ALL_CART"})
       //history.push("/login")
       window.location.href="/login";
    }
   }

    useEffect(()=>{
        
        const token = user?.token;

        if(token){
            const decodedToken = decode(token);
            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

    },[location])

    return (
        <div className="header">
        <Link to="/">
            <img className="header_logo"
            src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="logo"/>
        </Link>
            <div className="header_search">
                <input 
                className="header_searchInput"
                    type="text"
                />
                <SearchIcon
                    className="header_searchIcon"
                />
            </div> 
            <div className="header_nav">
            <Link to={user?.result ? "/account-settings": "/login"}>
                <div className="header_option dropdown">
                        <span 
                        className="header_optionLineOne">
                            Hello 
                        </span> 
                        <span 
                        className="header_optionLineTwo">
                            {user?.result ? user?.result.name + "▼" : "Sign In"} 
                        </span>        
                    {user?.result ? <div className="dropdown-content">
                        <Link to="/account-settings">Your Account</Link>
                        <Link to={user?.result ? "#" : "/login"} onClick={user?.result ? logout : null}>Sign Out?</Link>
                    </div> :null}
                </div>
            </Link>
             <Link onClick={()=>{if(!user?.result)return alert("Please create an account or Login")}} to={user?.result ? "/orders": "/"} >
                <div className="header_option">
                    <span 
                    className="header_optionLineOne">
                        Returns
                    </span>
                    <span 
                    className="header_optionLineTwo">
                        & Orders
                    </span>
                </div>
             </Link>
            
            <Link onClick={()=>{if(!user?.result)return alert("Please create an account or Login")}} to="/" >
                <div className="header_option">
                    <span 
                    className="header_optionLineOne">
                        Your
                    </span>
                    <span 
                    className="header_optionLineTwo">
                        Prime
                    </span>
                </div>
            </Link>    
                <Link onClick={()=>{if(!user?.result)return alert("Please create an account or Login")}}  to={user?.result ? "/checkout": "/"}>
                <div className="header_optionBasket">
                    <ShoppingBasketIcon />
                    <span className="header_optionLineTwo header_basketCount">{cart?.length ? cart.length : "0"}</span>
                </div>
                </Link>
            </div>           
        </div>
    )
}
 
export default Header
