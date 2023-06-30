import React,{useEffect, useState} from 'react';
import "./Home.css";
import Product from '../Product/Product';
import { fetchProducts } from '../../actions/products';
import { getCartItems } from '../../actions/auth';
import { useDispatch, useSelector } from 'react-redux';

const Home=()=>{

  const dispatch = useDispatch();
  const [user,setUser] = useState(JSON.parse(localStorage.getItem("profile")));    
  const {products,isLoading} = useSelector((state)=>state.products);

  useEffect(()=>{
   dispatch(fetchProducts());
   if(user){
   dispatch(getCartItems(user?.result._id));}
  },[]);

    return (
      <div className="home">
      <div className="home__container">
        <img
          className="home__image"
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />

        {isLoading ? null:<><div className="home__row">
        {products.products.map((product,index)=>{
          
          if(index < 2)
          return (<Product 
            key={index}
            id={product._id}
            title={product.name}
            price={product.price}
            rating={5}
            image={product.imageFile}
          />)
        })}
        </div>

        <div className="home__row">
        {products.products.map((product,index)=>{
          if(index>1 && index < 5)
           return(<Product 
            key={index}
            id={product._id}
            title={product.name}
            price={product.price}
            rating={5}
            image={product.imageFile}
          />)
        })}
        </div>

        <div className="home__row">
        {products.products.map((product,index)=>{
         
          if(index === 5)
           return(<Product 
            key={index}
            id={product._id}
            title={product.name}
            price={product.price}
            rating={5}
            image={product.imageFile}
          />)
        })}
        </div> </>}
      </div>
    </div>
  );
}

export default Home
