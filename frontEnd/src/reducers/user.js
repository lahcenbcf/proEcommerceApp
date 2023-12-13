import {USER_REQUEST,USER_SUCCESS,USER_FAIL,CLOSE_LOGIN_SESSION} from "../constants/userLogin"
import {UNAUTHORIZED} from "../constants/unAuthorizedActions"
import { USERDETAILS_FAIL, USERDETAILS_REQUEST, USERDETAILS_SUCCESS,CLEAR_USER_DETAILS } from "../constants/userDetails"
//login reducer
const initialState1={
    loading:false,
    userInfo:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
    error:"",
    success:false
}
export const loginUserReducer=(state=initialState1,action)=>{
    switch (action.type) {
        case USER_REQUEST:
            return {...state,loading:true,success:false}
        case USER_SUCCESS:
            return {userInfo:action.payload,loading:false,success:true}
        case USER_FAIL:
            return {...state,loading:false,error:action.payload,success:false}
        case CLOSE_LOGIN_SESSION:
            return {...state,userInfo:{}}
        default: return state
    }
}

//register reducer
const initialState2={
    loading:false,
   success:false,
   error:""
}
export const registerUserReducer=(state=initialState2,action)=>{
    switch (action.type) {
        case USER_REQUEST:
            return {...state,loading:true}
        case USER_SUCCESS:
            return {success:action.payload,loading:false}
        case USER_FAIL:
            return {...state,loading:false,error:action.payload}
        default: return state
    }
}

//Unauthorized reducer
const initialState3={
    authorized:true,
    error:""
}
export const unauthorized=(state=initialState3,action)=>{
    switch (action.type) {
        case UNAUTHORIZED:
            return {authorized:false,error:action.payload}
        default:
            return state
    }
}


//userDetailsReducer
const initialState4={
    loading:false,
    user:localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
}

export const userDetailsReducer=(state=initialState4,action)=>{
    switch (action.type) {
        case USERDETAILS_REQUEST:
            return {...state,loading:true}
        case USERDETAILS_SUCCESS: 
            return {loading:false,user:action.payload}
        case CLEAR_USER_DETAILS:
            return {loading:false,user:{}}
        case USERDETAILS_FAIL:
            return {...state,error:action.payload,loading:false}
        case CLEAR_USER_DETAILS:
            return {
                ...state,user:{}
            }
        default:
            return state
    }
}

