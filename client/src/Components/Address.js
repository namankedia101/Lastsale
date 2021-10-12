import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Address.css";

const Address = ({name,tel,state,pincode,address,hidden}) => {
    return (
        
        <div>
            <h3>{name}</h3>
            <p>{tel}</p>
            <p>{state}, {pincode}</p>
            <p>{address}</p>
            { hidden ? null :
            <div className="editAddress">
            {/* <Link to="/account-settings/add-new-address">
                EDIT
            </Link>
            <p>|</p> */}
            <Link to="">
                REMOVE
            </Link></div>}
        </div>
            )
    
}

export default Address
