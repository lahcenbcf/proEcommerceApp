import {
    SUCCESSPRODUCTLIST,
    FAILPRODUCTLIST,
    PENDINGPRODUCTLIST,
    PRODUCT_PENDING,
    PRODUCT_FAIL,
    PRODUCT_SUCCESS
} from "../constants/productsActions"

import axios from "axios"
export const placeholderApi = axios.create({
    baseURL: 'http://127.0.0.1:5000',
  });
//loadProducts
export const listProducts=()=>async(dispatch)=>{
    try {
        dispatch({
            type:PENDINGPRODUCTLIST
        })
        const endpoint="/products/"
        const {data}=await placeholderApi.get(endpoint);
        dispatch({
            type:SUCCESSPRODUCTLIST,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:FAILPRODUCTLIST,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}

//get Uniq Prod
export const getProduct=(productId)=>async(dispatch)=>{
    try {
        const endPoint=`/products/${productId}`
        dispatch({
            type:PRODUCT_PENDING
        })
        const {data}=await placeholderApi.get(endPoint);
        
            dispatch({
                type:PRODUCT_SUCCESS,
                payload:data
            })
     
            
        
    } catch (error) {
        dispatch({
            type:PRODUCT_FAIL,
            payload:error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}