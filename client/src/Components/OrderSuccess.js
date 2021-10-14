import React from 'react';
import {useParams} from "react-router-dom";

function OrderSuccess() {
    const {payId,orderId} = useParams();
    return (
        <div>{payId.toString().length === 18 && orderId.toString().length === 20 ?
            <>
            <h1>Your order was placed successfully!</h1>
            <h3>Go back to <a href="/orders"><span>Orders</span></a> page to see your orders or <a href="/"><span>Continue Shopping</span></a></h3></>
            :
            <><h1>What are you doing here</h1>
            <a href="/"><span>Continue Shopping</span></a></>}
        </div>
    )
}

export default OrderSuccess
