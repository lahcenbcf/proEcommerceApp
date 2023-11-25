import {CREATE_ORDER,ORDER_FAIL,ORDER_SUCCESS} from "../constants/orderConstants"

import { placeholderApi } from "./products"


export const createOrder=(data)=>async(dispatch)=>{
    try {
        dispatch({
            type:CREATE_ORDER
        })
        const myToken=localStorage.getItem("user") && JSON.parse(localStorage.getItem("user")).token
        console.log(myToken)
        const res=await placeholderApi.post("/order/createorder",
            
            data,{
                headers:{
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