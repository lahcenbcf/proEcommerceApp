import { distance } from "framer-motion";
import {ADMIN_ACTION_ERROR,
    ADMIN_ACTION_SUCCESS,
    START_ACTION,
    UPDATE_ORDER_TO_PAID,
    ADD_USERS_TO_LIST,
    UPDATE_USER_ADMIN_LIST,
     ADD_PRODUCTS_TO_ADMIN_LIST,
     DELETE_PRODUCT_FROM_ADMIN_LIST,
     PENDING_PRODUCT_ACTION,
     PRODUCT_ACTION_ERROR,
     PRODUCT_ACTION_SUCCESS,
     CREATE_PRODUCT,
     ORDER_ADMIN_FAIL,
     ORDER_ADMIN_ACTION_PENDING,
     ORDER_ADMIN_SUCCESS,
     UPDATE_ORDER_STATUS
    } from "../constants/AdminActions"
import { CLEAR_USER_DETAILS } from "../constants/userDetails";
import { placeholderApi } from "./products"
//actions fait par admin

export const updateOrderToPaid=(orderId)=>async(dispatch,getState)=>{
    try {
        //loading action
        dispatch({
            type:UPDATE_ORDER_TO_PAID
        })
        const res=await placeholderApi.patch(`/admin/updateOrderToPaid/${orderId}`);
        //if the order status is upodated successufully we will return true as a response
        if(res.data){
            dispatch({
                type:ADMIN_ACTION_SUCCESS,
                payload:res
            })
            //change it in client side
            dispatch( {
                type:UPDATE_ORDER_STATUS,
                payload:orderId
            })
        }else{
            dispatch({
                type:ADMIN_ACTION_ERROR,
                payload:res.message
            })
        }
    } catch (error) {
        dispatch({
            type:ADMIN_ACTION_ERROR,
            payload:error.message
        })
    }
}

// get All users
export const getAllUsers=()=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:START_ACTION
        })
        const res=await placeholderApi.get("/admin/getUsers",{
            headers:{
                Authorization:`Bearer ${getState().userDetails.token}`
            }
        })
        if(res.data.message){
           dispatch({
            type:ADMIN_ACTION_ERROR,
            payload:res.data.message
           })
        }
        else{
           
            dispatch({
                type:ADMIN_ACTION_SUCCESS,
                payload:res.data.users
            })
            //save the users in userList 
            dispatch({
                type: ADD_USERS_TO_LIST,
                payload:res.data.users
            })
        }
    } catch (error) {
        dispatch({
            type:ADMIN_ACTION_ERROR,
            payload:error.message
        })
    }
}

export const getAllProducts=()=>async(dispatch)=>{
    try {
        dispatch({
            type:PENDING_PRODUCT_ACTION
        })
        const res=await placeholderApi.get("/admin/getAllProducts");
        if(res?.data?.message){
            dispatch({
                type:PRODUCT_ACTION_ERROR,
                payload:res.data.message
            })
        }else{
            dispatch(
                {
                    type:ADD_PRODUCTS_TO_ADMIN_LIST,
                    payload:res.data.products
                }
            )
        }
    } catch (error) {
        dispatch({
            type:PRODUCT_ACTION_ERROR
        })
    }
}

export const deleteUser=(id)=>async(dispatch,getState)=>{
        try {
            dispatch({
                type:START_ACTION
            })
            const res=await placeholderApi.delete(`/admin/deleteUser/${id}`);
            
            if(res.data.message){
                dispatch({
                    type:ADMIN_ACTION_ERROR,
                    payload:res.data.message
                })
            }else{
                //check if current user is the deleted user
                const currentUserId=getState().userDetails.user._id
                if(id==currentUserId){
                    //deleted from local storage
                    localStorage.removeItem("user")
                    dispatch({
                        type:CLEAR_USER_DETAILS
                    })
                }
                dispatch({
                    type:ADMIN_ACTION_SUCCESS
                })
            //update userList
            dispatch({
                type:UPDATE_USER_ADMIN_LIST,
                payload:id
            })

            }
        } catch (error) {
            dispatch({
                type:ADMIN_ACTION_ERROR,
                payload:error.message
            })
        }
}


export const deleteProduct=(productId)=>async(dispatch)=>{
    try {
        dispatch({
            type:PENDING_PRODUCT_ACTION
        })
        const res=await placeholderApi.delete(`/admin/deleteProduct/${productId}`)
        if(res?.data?.message){
            dispatch({
                type:PRODUCT_ACTION_ERROR,
                payload:res.data.message
            })
        }else{
            dispatch({
                type:DELETE_PRODUCT_FROM_ADMIN_LIST,
                payload:productId
            })
        }
    } catch (error) {
        dispatch({
            type:PRODUCT_ACTION_ERROR,
            payload:error.message
        })
    }
}

export const editUserStatus=(userId,newUserInfo)=>async(dispatch)=>{
    try {
        dispatch({
            type:START_ACTION
        })
        const res=await placeholderApi.patch(`/admin/updateStatus/${userId}`,{
            newUserInfo
        },{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res.data.message){
            dispatch({
                type:ADMIN_ACTION_ERROR,
                payload:res.data.message
            })
        }else{
            dispatch({
                type:ADMIN_ACTION_SUCCESS,
                payload:res.data
            })
        }
    } catch (error) {
        dispatch({
            type:ADMIN_ACTION_ERROR,
            payload:ADMIN_ACTION_ERROR
        })
    }
}

export const getUserById=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:START_ACTION
        })
        const res=await placeholderApi.get(`/admin/getUserByIdToEdit/${id}`);
        if(res.data?.message){
            dispatch({
                type:ADMIN_ACTION_ERROR,
                payload:res.data.message
        })
        }else{
            dispatch({
                type:ADMIN_ACTION_SUCCESS,
                payload:res.data
            })
        }
    } catch (error) {
        dispatch({
            type:ADMIN_ACTION_ERROR,
            payload:error.message
        })
    }
}

export const createProduct=(id)=>async(dispatch)=>{
    try {
        dispatch({
            type:PENDING_PRODUCT_ACTION
        })
        const res=await placeholderApi.post("/admin/createProduct",JSON.stringify({
            adminId:id
        }),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        if(res?.data?.message){
            dispatch({
                type:PRODUCT_ACTION_ERROR
            })
        }else{
            dispatch({
                type:CREATE_PRODUCT,
                payload:res.data
            })
        }
    } catch (error) {
        dispatch({
            type:PRODUCT_ACTION_ERROR,
            payload:error.message
        })
    }
}


export const editProduct=(productId,data)=>async(dispatch)=>{
    try {
        dispatch({
            type:PENDING_PRODUCT_ACTION
        })
        const res=await placeholderApi.patch(`/admin/updateProduct/${productId}`,JSON.stringify(data),{
            headers:{
                "Content-Type":"application/json"
            }
        })
        console.log(res.data)
        if(res?.data?.message){
            dispatch({
                type:PRODUCT_ACTION_ERROR
            })
        }else{
            dispatch({
                type:PRODUCT_ACTION_SUCCESS
            })
        }
    } catch (error) {
        dispatch({
            type:PRODUCT_ACTION_ERROR,
            payload:error.message
        })
    }
}


//getAllorders
export const getAllOrders=()=>async(dispatch)=>{
    try {
        dispatch({
            type:ORDER_ADMIN_ACTION_PENDING
        })
        const res=await placeholderApi.get("/admin/getAllOrders");
        if(res.data?.message){
            dispatch({
                type:ORDER_ADMIN_FAIL,
                payload:res.data.message
            })
        }else {
            dispatch({
                type:ORDER_ADMIN_SUCCESS,
                payload:res.data
            })
        }
    } catch (error) {
        dispatch({
            type:ORDER_ADMIN_FAIL,
            payload:error.message
        })
    }
}



