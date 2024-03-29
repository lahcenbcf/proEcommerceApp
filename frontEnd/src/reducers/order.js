import {CREATE_ORDER,ORDER_FAIL,ORDER_SUCCESS,GET_ORDERS,ORDER_PAY_FAIL,ORDER_PAY_REQUEST,ORDER_PAY_RESET,ORDER_PAY_SUCCESS} from "../constants/orderConstants"
import {ORDER_DETAILS_PENDING,ORDER_DETAILS_FAIL,ORDER_DETAILS_SUCCESS} from "../constants/orderDetailsConstants"
const initialState={
    error:"",
    loading:false,
    success:false,
    order:{}
}

export const orderReducer=(state=initialState,action)=>{
        switch (action.type) {
            case GET_ORDERS:
            return {
                ...state,
                orders:action.payload
            }
            case CREATE_ORDER:
                return {
                    ...state,
                    loading:true
                }
                
            case ORDER_FAIL:
                return {
                    ...state,
                    error:action.payload
                }
            case ORDER_SUCCESS:
                return {
                    ...state,
                    loading:false,
                    success:true,
                    order:action.payload
                }
            

            default:
                return state;
        }
}
const initialState2={
    success:false,
    loading:false,
    error:"",
    orderinfo:{}
}
export const orderDetailsReducer=(state=initialState2,action)=>{
    switch (action.type) {
        case ORDER_DETAILS_PENDING:
                return {
                    ...state,
                    loading:false
                }
        case ORDER_DETAILS_SUCCESS:
            return {
                ...state,
                loading:false,
                orderinfo:action.payload,
                success:true
            }
        case ORDER_DETAILS_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}


const initialState3={
    success:false,
    loading:false,
    error:"",
    orderinfo:{}
}
export const orderPaidReducer=(state=initialState3,action)=>{
    switch (action.type) {
        case ORDER_PAY_REQUEST:
                return {
                    loading:false
                }
        case ORDER_PAY_SUCCESS:
            return {
                loading:false,
                success:true
            }
        case ORDER_PAY_RESET:
            return {
            }
        case ORDER_PAY_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state
    }
}