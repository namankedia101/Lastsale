import * as api from "../api/index";

export const signup = (formData, history)=>async(dispatch)=>{
    try {
        const {data} =await api.signUp(formData);
        dispatch({type:"AUTH", data});
        history.push("/");
    } catch (error) {
        alert(error.message);
    }
}

export const signin = (formData, history)=>async(dispatch)=>{
    try {
        const {data} =await api.signIn(formData);
        dispatch({type:"AUTH", data});
        history.push("/");
    } catch (error) {
        alert(error.message);
    }
}

export const addToCart = (id,userId)=>async(dispatch)=>{
    try{const {data:{result}} = await api.addToCart(id,userId);
    dispatch({
        type:"ADD_TO_BASKET",
        payload:result
    })
}
    catch(error){
        alert(error);
    }
}

export const removeFromCart = (id,userId)=>async(dispatch)=>{
    try{
        const {data:{result}} = await api.removeFromCart(id,userId);
        dispatch({
            type:"REMOVE_FROM_BASKET",
            payload:{
                id:id
            }
        })
    }
    catch(error){
        alert(error);
    }
}

export const getCartItems = (userId)=>async(dispatch)=>{
    try{
        const {data:{result}} =await api.getCartItems(userId);
        dispatch({
            type:"ADD_TO_BASKET",
            payload:result
        })
    }
    catch(error){
        alert(error);
    }
}

export const getUserOrders =(userId)=>async(dispatch)=>{
    try{
        const {data:{result}} = await api.getUserOrders(userId);
        dispatch({
            type:"FETCH_ORDERS",
            payload:result
        });   
    }
    catch(error){
        alert(error);
    }
}

export const addNewAddress =(userId,formData,history)=>async(dispatch)=>{
    try{
        const {data:{result}} = await api.addNewAddress(userId,formData);
        dispatch({
            type:"USER_ADDRESSES",
            payload:result
        });
        history.push("/account-settings");
    }catch(error){
        alert(error)
    }
}

export const getUserAddresses=(userId)=>async(dispatch)=>{
    try {
        
        const {data:{result}} = await api.getUserAddresses(userId);
        dispatch({
            type:"USER_ADDRESSES",
            payload:result
        });
    } catch (error) {
        alert(error);
    }
}