import {ADD_CART_ITEM,REMOVE_CART_ITEM,FAIL_CART,SAVE_SHIPPING_ADRESS, SAVE_PAYMENT_METHOD} from "../constants/cartActions"


// get cartItems from localStorage
const cartItems=localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
// get Shipping Adress from local storage
//for example if user close window we need to save the adr
const shippingAdress=localStorage.getItem("shippingAdress") ? JSON.parse(localStorage.getItem("shippingAdress")): ""
const paymentMethod=localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")): ""
const initialState={
    empty:!cartItems.length,
    cart:{
        cartItems,
        shippingAdress,
        paymentMethod
    },
    error:""
}
export const CartReducer=(state=initialState,action)=>{
    switch (action.type) {
        case ADD_CART_ITEM:
           const ItemFound=state.cart.cartItems.find(item=> item.name === action.payload.name)
           if(ItemFound){
            
            //update our orders
            const newItems=state.cart.cartItems.map(o=>{
                if(o.name === action.payload.name){
                    return {
                        ...o,
                        qty:action.payload.qty,
                        price:Number(o.unit_price) * (action.payload.qty)
                    }
                }else return o
            })
            return {...state,cart:{
                ...state.cart,
                cartItems:newItems
            }}
           }else{
            return {
                empty:false,
                cart:{
                    ...state.cart,
                cartItems:[...state.cart.cartItems,action.payload]
            }
        }
           }
        case REMOVE_CART_ITEM :
            const itemToDelete=state.items.find(item=>item.name === action.payload)
            if(itemToDelete){
                const newItems=state.items.filter(item=>item.name !== action.payload)
               const isEmpty=!newItems.length
                return {
                    empty:isEmpty,
                    cartItems:newItems
                }
            }else return {
                ...state,error:"item to delete is not found"
            }
            
        case FAIL_CART :
            return {
                ...state,
                error:action.payload
            }
        case SAVE_SHIPPING_ADRESS:
            return {
                ...state,
                cart:{
                    ...state.cart,
                    shippingAdress:action.payload
                }
            }
        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                cart:{
                    ...state.cart,
                    paymentMethod:action.payload
                }
            }
        default:
           return state
    }
}