import {ADD_CART_ITEM,REMOVE_CART_ITEM,FAIL_CART, SAVE_SHIPPING_ADRESS,SAVE_PAYMENT_METHOD} from "../constants/cartActions"
import { placeholderApi } from "./products"
export const addCartItem=(productId,qty=1)=>async(dispatch,getState)=>{
    try {
        if(productId) {
            const {data}=await placeholderApi.get(`/products/${productId}`)
            const newItem={
                product:data,
                name:`item ${data._id}`,
                qty,
                unit_price:data.price,
                price:Number(data.price) ,
                image:data.image
            }
            dispatch({
                type:ADD_CART_ITEM,
                payload:newItem
            })
            //update localStorage
            localStorage.setItem("cartItems",JSON.stringify(getState().cart.cart.cartItems))
            /*
            //get the local storage
            const  {items}=localStorage.getItem("items") ? JSON.parse(localStorage.getItem("items")) : []
            //add to localStorage
            console.log(items)
            const existBefore=items.find(item => item.name === newItem.name)
            if(existBefore){
                const newCartItems=items.map(item =>{
                    if(item.name == newItem.name) return {...item,qty:item.qty+1,price:item.unit_price * (item.qty+1)}
                    return item
                })
                localStorage.setItem("items",JSON.stringify(newCartItems))
            }else{
            localStorage.setItem("items",JSON.stringify({
                items: [...cartItems,newItem]
            }))
            }*/
        }
        
        

    } catch (error) {
        dispatch({
            type:FAIL_CART,
            payload:error.message
        })
    }
}


export const removeCartItem=(order)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:REMOVE_CART_ITEM,
            payload:order
        })
        /*
        //get the local storage
        const cartItems=localStorage.getItem("cartItems",JSON.parse(getState().cart.items)) ? JSON.parse(getState().cart.items) : []
        //add to localStorage
        const existBefore=cartItems.find(item => item.name === newOrder.name)
        if(existBefore){
            const newCartItems=cartItems.map(item =>{
                if(item.name == newOrder.name){
                    if(item.qty <2) return null
                    item.qty-=item.qty;
                    item.price = item.unit_price * item.qty
                    return item;
                }else return item
            })
            localStorage.setItem("cartItems",JSON.stringify(newCartItems))
        }
        */
       //update the local Storage
       //je ecrase local storage par le nouveau status of my Cart
       localStorage.setItem("cartItems",JSON.stringify(getState().cart.items))
    } catch (error) {
        dispatch({
            type:FAIL_CART,
            payload:error.message
        })
    }
}


//save shipping adress
export const saveShippingAdress=(data)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:SAVE_SHIPPING_ADRESS,
            payload:data
        })
        //update local Storage
        localStorage.setItem("shippingAdress",JSON.stringify(getState().cart.cart.shippingAdress))
       window.location.href="/payment"
    } catch (error) {
        dispatch({
            type:FAIL_CART,
            payload:error.message
        })
    }
}


//save paymentMethod


export const savePaymentMethod=(pm)=>(dispatch,getState)=>{
    try {
        dispatch({
            type:SAVE_PAYMENT_METHOD,
            payload:pm
        })
        // save it in local storage
        localStorage.setItem("paymentMethod",JSON.stringify(getState().cart.cart.paymentMethod))
        window.location.href="/order"
    } catch (error) {
        dispatch({
            message:"error saving mathod payment"
        })
    }
}