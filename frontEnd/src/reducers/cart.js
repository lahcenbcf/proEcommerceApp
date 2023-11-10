import {ADD_CART_ITEM,REMOVE_CART_ITEM,FAIL_CART} from "../constants/cartActions"


// get cartItems from localStorage
const cartItems=localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
console.log(cartItems)
const initialState={
    empty:!cartItems.length,
    items:cartItems,
    error:""
}
export const CartReducer=(state=initialState,action)=>{
    switch (action.type) {
        case ADD_CART_ITEM:
           const ItemFound=state.items.find(item=> item.name === action.payload.name)
           if(ItemFound){
            
            //update our orders
            const newItems=state.items.map(o=>{
                if(o.name === action.payload.name){
                    return {
                        ...o,
                        qty:action.payload.qty,
                        price:Number(o.unit_price) * (action.payload.qty)
                    }
                }else return o
            })
            return {...state,items:newItems}
           }else{
            return {
                empty:false,
                items:[...state.items,action.payload]
            }
           }
        case REMOVE_CART_ITEM :
            const itemToDelete=state.items.find(item=>item.name === action.payload)
            if(itemToDelete){
                const newItems=state.items.filter(item=>item.name !== action.payload)
               const isEmpty=!newItems.length
                return {
                    empty:isEmpty,
                    items:newItems
                }
            }else return {
                ...state,error:"item to delete is not found"
            }
            
        case FAIL_CART :
            return {
                ...state,
                error:action.payload
            }
        default:
           return state
    }
}