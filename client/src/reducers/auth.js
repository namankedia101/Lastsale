/* eslint-disable import/no-anonymous-default-export */
//import { AUTH, LOGOUT } from "../constants/constants";

const initialState={
    authData:null,
    loading:false,
    errors:null
}

export default (state=initialState,action)=>{
    switch(action.type){
        case "AUTH":
            localStorage.setItem("profile",JSON.stringify({...action?.data}));
            return {...state, authData: action?.data, loading: false, errors: null};
        
        case "LOGOUT":
        localStorage.clear();
        return {...state,authData:null};   
        
        default:
            return "";    
    }
}