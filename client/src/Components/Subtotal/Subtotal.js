import React from 'react';
import CurrencyFormat from 'react-currency-format';
import "./Subtotal.css";
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Subtotal() {
    const history = useHistory();
    const {cart} = useSelector((state)=>state.products);
    const getBasketTotal = cart?.reduce((amount, item) => item.price + amount, 0);

    return (
        <div className="subtotal">
            <CurrencyFormat
            renderText={(value)=>(
                <>
                    <p>
                        Subtotal {cart?.length} items: <strong>{value}</strong>
                    </p>
                    <small className="subtotal_gift">
                        <input type="checkbox" /> This order contains a gift
                    </small>
                </>
            )}
            value={getBasketTotal}
            decimalScale={2}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"} />
            <button onClick={(e)=>{if(getBasketTotal>0){history.push("/payment")}else{alert("Please first add the products in cart")}}} >Proceed to Checkout</button>
        </div>
    )
}

export default Subtotal
