import React from 'react';
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Checkout  from "./Components/Checkout/Checkout";
import Payment from "./Components/Payment/Payment";
import NewProduct from "./Components/NewProduct/NewProduct";
import OrderSuccess from "./Components/OrderSuccess/OrderSuccess";
import AddressForm from './Components/AddressForm/AddressForm';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import { Redirect } from 'react-router';
import Login from './Components/Login/Login';
import Orders from "./Components/Orders/Orders";
import Account from './Components/Account/Account';

const App=()=>{

  const user = JSON.parse(localStorage.getItem("profile"));

  // const result = useSelector((state)=>state.auth.authData);
  // const user = result
  // console.log(user);

  const defaultRoutes= ()=>{
    return(
      <div>
    <Header/>
    <Switch>
          <Route exact
            path="/account-settings"
            render={() => user ? <Account />: <Redirect to="/" />}
          />
          <Route exact
            path="/orders"
            render={() => user ? <Orders /> : <Redirect to="/" />}
          />
          <Route exact
            path="/checkout"
            render={() => user ? <Checkout />: <Redirect to="/" />}
          />
          <Route exact
            path="/payment"
            render={() => user ? <Payment /> : <Redirect to="/" />}
          />
          <Route exact
            path="/account-settings/add-new-address"
            render={() => user ? <AddressForm /> : <Redirect to="/" />}
          />
          <Route exact path="/" component={Home} />
    </Switch>
    </div>
    )
  }

  return (
    <BrowserRouter>
    <Switch>
    <Route exact path="/login" render={()=>user ? <Redirect to="/" />:<Login />} />
    <Route exact path= "/newProduct" render={()=>user.result.contactInfo.email === "kediaarts@gmail.com" ? <NewProduct /> : <Redirect to="/" />}/>
    <Route exact 
            path="/order-success-page/:payId/:orderId" 
            render={()=> user ? <OrderSuccess /> : <Redirect to="/" />}
    />
    <Route component={defaultRoutes} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
