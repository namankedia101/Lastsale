import * as api from "../api/index";

export const createNewProduct =(formData,history)=>async(dispatch)=>{
    try{
    const {data} =await api.createNewProduct(formData);
    history.push("/");
    }catch(error){
        alert(error.message);
    }
}

export const fetchProducts =()=>async(dispatch)=>{
    try{
        dispatch({
            type:"IS_LOADING_TRUE"
        });
        const {data} =await api.fetchProducts();
        dispatch({
            type:"FETCH_PRODUCTS",
            payload:data
        });
        dispatch({
            type:"IS_LOADING_FALSE"
        });
    }catch(error){
        alert(error.message);
    }
}