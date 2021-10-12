/* eslint-disable import/no-anonymous-default-export */
const initialState ={
    isLoading:true,
    products:[],
    cart:[],
    orders:[],
    userAddresses:[]
}
export default (state=initialState,action)=>{
    switch(action.type){
        case "IS_LOADING_TRUE":
          return {...state,isLoading:true};

        case "IS_LOADING_FALSE":
          return{...state,isLoading:false};

        case "ADD_TO_BASKET":
          return{...state,cart:action.payload};

        case "REMOVE_FROM_BASKET":
            const index = state.cart.findIndex(
                (item) => item._id === action.payload.id
            );
            let newCart= [...state.cart];
            if (index >= 0) {
                newCart.splice(index, 1);
        
              } else {
                alert(
                  "Cant remove product as its not in basket!"
                )
              }
            return {...state,cart:newCart};

        case "FETCH_PRODUCTS":
              return{...state,products:action.payload}

        case "FETCH_ORDERS":
              return{...state,orders:action.payload}

        case "REMOVE_ALL_CART":
            return{...state,cart:[]}

        case "USER_ADDRESSES":
            return{...state,userAddresses:action.payload}

        default:
            return state;
    }
}