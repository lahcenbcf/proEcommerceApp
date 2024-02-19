import {
    SUCCESSPRODUCTLIST,
    FAILPRODUCTLIST,
    PENDINGPRODUCTLIST,
    PRODUCT_PENDING,
    PRODUCT_FAIL,
    PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REVIEW,
    GET_TOP_RATED_PRODUCTS
} from "../constants/productsActions"

import axios from "axios"
export const placeholderApi = axios.create({
    /*baseURL: 'https://proecommeceappmanagement.onrender.com/',*/
    baseURL:"http://localhost:5000"
  });
//loadProducts
export const listProducts=(keyword="",pageNum="")=>async(dispatch)=>{
    try {
        dispatch({
            type:PENDINGPRODUCTLIST
        })
        const endpoint=`/products?keyword=${keyword}&&pageNum=${pageNum}`
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

export const AddReviewToProduct=(productId,review)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:PRODUCT_PENDING
        })
        const res=await placeholderApi.post(`/products/createReview/${productId}`,JSON.stringify(review),{
            headers:{
                "Authorization":`Bearer ${getState().userDetails.user.token}`,
                "Content-Type":"application/json"
            }
        })

        if(res.data?.message){
            dispatch({
                type:PRODUCT_FAIL,
                payload:res.data.message
            })
        }else{
            dispatch({
                type:UPDATE_PRODUCT_REVIEW,
                payload:review
            })
        }
    } catch (error) {
        dispatch({
            type:PRODUCT_FAIL,
            payload:error.message
        })
    }
}

//get top products
export const getTopProducts=()=>async(dispatch)=>{
    try {
        dispatch({
            type:PRODUCT_PENDING
        })
        const res=await placeholderApi.get("/products/top");
        if(res.data?.message){
            dispatch({
                type:PRODUCT_FAIL
            })
        }else{
            dispatch({
                type:GET_TOP_RATED_PRODUCTS,
                payload:res.data
            })
        }
    } catch (error) {
        dispatch({
            type:PRODUCT_FAIL,
            payload:error.message
        })
    }
}