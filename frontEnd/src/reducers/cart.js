import { saveTotalPrice } from "../actions/cart";
import {SAVE_TOTAL_PRICE,SAVE_TOTAL_ITEMS, ADD_CART_ITEM,REMOVE_CART_ITEM,FAIL_CART,SAVE_SHIPPING_ADRESS, SAVE_PAYMENT_METHOD,RESET_CART_ITEMS} from "../constants/cartActions"


// get cartItems from localStorage
const cartItems=localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [];
// get Shipping Adress from local storage
//for example if user close window we need to save the adr
const shippingAdress=localStorage.getItem("shippingAdress") ? JSON.parse(localStorage.getItem("shippingAdress")): ""
const paymentMethod=localStorage.getItem("paymentMethod") ? JSON.parse(localStorage.getItem("paymentMethod")): ""
const total = cartItems?.reduce((acc, currentItem) => {
    const priceToNumber = Number(currentItem.unit_price.split('$')[0]);
    return (acc += priceToNumber * Number(currentItem.qty));
  }, 0);
  const totalItems = cartItems?.reduce((acc, currentItem) => {
    return acc += currentItem.qty
  }, 0);
const initialState={
    empty:!cartItems.length,
    cart:{
        cartItems,
        shippingAdress,
        paymentMethod,
        totalPrice:total,
        totalItems:totalItems
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
                        qty:action.payload.qty==1 ? ItemFound.qty+1 : action.payload.qty,
                        price:Number(o.unit_price) * (action.payload.qty)
                    }
                }else return o
            })

            const total = newItems?.reduce((acc, currentItem) => {
                const priceToNumber = Number(currentItem.unit_price.split('$')[0]);
                return (acc += priceToNumber * Number(currentItem.qty));
              }, 0);
              const totalItems = newItems?.reduce((acc, currentItem) => {
                return acc += currentItem.qty
              }, 0);
              
            return {...state,cart:{
                ...state.cart,
                cartItems:newItems,
                totalPrice:total,
                totalItems
            }}
           }else{
            return {
                empty:false,
                cart:{
                    ...state.cart,
                    totalPrice:total,
                totalItems,
                cartItems:[...state.cart.cartItems,action.payload]
            }
        }
           }
        case REMOVE_CART_ITEM :
            const itemToDelete=state.cart.cartItems.find(item=>item.name === action.payload)
            if(itemToDelete){
                const newItems=state.cart.cartItems.filter(item=>item.name !== action.payload)
               const isEmpty=!newItems.length
                return {
                    empty:isEmpty,
                    cart:
                    {
                        ...state.cart,
                        cartItems:newItems}
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
        case RESET_CART_ITEMS:
            return {
                ...state,
                cart:{
                    cartItems:[]
                }
            }
        case SAVE_TOTAL_PRICE:
            return {
                ...state,
                cart:{
                    ...state.cart,
                    totalPrice:action.payload
                }
            }
        case SAVE_TOTAL_ITEMS:
            return {
                ...state,
                cart:{
                    ...state.cart,
                    totalItems:action.payload
                }
            }
        default:
           return state
    }
}
