import {CREATE_ORDER,ORDER_FAIL,ORDER_PAY_REQUEST,ORDER_SUCCESS} from "../constants/orderConstants"
import {ORDER_DETAILS_FAIL,ORDER_DETAILS_PENDING,ORDER_DETAILS_SUCCESS} from "../constants/orderDetailsConstants"

import { placeholderApi } from "./products"


export const createOrder=(data)=>async(dispatch)=>{
    try {
        dispatch({
            type:CREATE_ORDER
        })
        const myToken=localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).token
        const res=await placeholderApi.post("/order/createorder",
            
            JSON.stringify(data),{
                headers:{
                    "content-type":"application/json",
                    "Authorization":`Bearer ${myToken}`
                }
            
        })
        if(res.status === 201 ){
            //succcess
            dispatch({
                type:ORDER_SUCCESS,
                payload:res.data.orderInfo
            })
        }
        else{
            dispatch({
                type:ORDER_FAIL
            })
        }
    } catch (error) {
        dispatch({
            type:ORDER_FAIL
        })
    }
}


export const getOrders=()=>async(dispatch)=>{
    try {
        const userOrders=await placeholderApi.get("/order");
        dispatch({
            type:ORDER_SUCCESS,
            payload:userOrders
        })
    } catch (error) {
        dispatch({
            type:ORDER_FAIL
        })
    }
}

export const getOrderById=(orderId)=>async(dispatch,getState)=>{
    try {
        //just to activate loading mode
        dispatch({
            type:ORDER_DETAILS_FAIL
        }) 
        const myToken=getState().login.userInfo.token;
        const res=await placeholderApi.get(`/order/${orderId}`,{
            headers:{
                Authorization:`Bearer ${myToken}`
            }
        }) 
        if(res.status === 200){
            dispatch({
                type:ORDER_DETAILS_SUCCESS,
                payload:res.data
            })
        }else{
            dispatch({
                type:ORDER_DETAILS_FAIL,
                payload:"something went wrong"
            })
        }
    } catch (error) {
        dispatch({
            type:ORDER_DETAILS_FAIL,
            payload:error.message
        })
    }
}


//payment actions


export const payOrder =(order_id,paymentRes)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:ORDER_PAY_REQUEST
        })
         
        const {userInfo}=getState().login

        const config={
            headers:{
                "Content-Type":"application/json",
                "Authorization":`Bearer ${userInfo.token}`
            }
        }
        const res =await placeholderApi.post(`/order/${order_id}/pay`,JSON.stringify({
            paymentRes
        }),config);
        dispatch({
            type:ORDER_SUCCESS,
            payload:userOrders
        })
    } catch (error) {
        dispatch({
            type:ORDER_FAIL
        })
    }
}