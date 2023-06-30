import React from 'react';
import "./Order.css";
import moment from 'moment';
import CheckoutProduct from '../CheckoutProduct/CheckoutProduct';
import CurrencyFormat from 'react-currency-format';

function Order({order}) {
    return (
        <div className="order">
            <h2>Order</h2>
            <p>{moment.unix(order.orderTime).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order_id">
                <small>{order.orderId}</small>
            </p>
            {order.items.map((item,index)=>
                <CheckoutProduct 
                        key={index}
                        id={item._id}
                        title={item.name}
                        image={item.imageFile}
                        price={item.price}
                        rating={5}
                        hideButton
                    />
            )}
            <CurrencyFormat
            renderText={(value)=>(
                    <h3>Order Total: {value}</h3>
            )}
            decimalScale={2}
            value={order.amount/100}
            displayType={"text"}
            thousandSeparator={true}
            prefix={"₹"}
                />
        </div>
    )
}

export default Order
