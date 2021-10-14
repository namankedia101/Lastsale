import React from 'react';
import Header from './Components/Header';
import Home from './Components/Home';
import Checkout  from "./Components/Checkout";
import Payment from "./Components/Payment";
import NewProduct from "./Components/NewProduct";
import OrderSuccess from "./Components/OrderSuccess";
import AddressForm from './Components/AddressForm';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import { Redirect } from 'react-router';
import Login from './Components/Login';
import Orders from "./Components/Orders";
import Account from './Components/Account';

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
          <Route exact 
            path="/order-success-page/:id" 
            render={()=>user ? <OrderSuccess />: <Redirect to="/" />}
          />
    </Switch>
    </div>
    )
  }

  return (
    <BrowserRouter>
    <Switch>
    <Route  path="/login" exact component={()=>user ? <Redirect to="/" />:<Login />} />
    <Route  path= "/newProduct" exact component={()=>user.result.contactInfo.email === "kediaarts@gmail.com" ? <NewProduct /> : <Redirect to="/" />}/>
    <Route component={defaultRoutes} />
    </Switch>
    </BrowserRouter>
  );
}

export default App;
