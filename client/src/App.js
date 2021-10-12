import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Home from './Components/Home';
import Checkout  from "./Components/Checkout";
import Payment from "./Components/Payment";
import NewProduct from "./Components/NewProduct";
import OrderSuccess from "./Components/OrderSuccess";
import {AddressForm}  from './Components/AddressForm';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import Login from './Components/Login';
import Orders from "./Components/Orders";
import { Account } from './Components/Account';
function App() {
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  return (
    <Router>
    <div className="app">
    <Switch>
    <Route exact path="/account-settings">
      {user?.result ?
      <><Header />
      <Account /></> : <Redirect to="/" />}
    </Route>
    <Route exact path= "/newProduct">
      {user?.result.contactInfo.email === "kediaarts@gmail.com" ? <NewProduct /> : <Redirect to="/" />}
    </Route>
    <Route exact path="/orders">
    {user?.result ? 
    <><Header />
      <Orders /></> : <Redirect to="/" />}
    </Route>
    <Route exact path="/login">
    {user?.result ? <Redirect to="/" />:<><Login /></> }
    </Route>
    <Route exact path="/checkout"> 
    {user?.result ? 
    <><Header />
      <Checkout /></> : <Redirect to="/" />}
    </Route>
    <Route exact path="/payment">
    {user?.result ? <><Header />
      <Payment /></> : <Redirect to="/" />}
    </Route>
    {/* <Route exact path="/order-success-page/:id">
    {user?.result ? <><OrderSuccess /></> : <Redirect to="/" />}
    </Route> */}
    <Route exact path="/account-settings/add-new-address">
    {user?.result ? <>
    <Header />
      <AddressForm /></> : <Redirect to="/" />}
    </Route>
    <Route exact path="/">
      <Header />
      <Home />
    </Route>
    </Switch>
    </div>
    </Router>
  );
}

export default App;
