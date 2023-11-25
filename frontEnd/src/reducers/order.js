import {CREATE_ORDER,ORDER_FAIL,ORDER_SUCCESS,GET_ORDERS} from "../constants/orderConstants"

const initialState={
    error:"",
    loading:false,
    orders:[]
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
                    orders:[...state.orders,action.payload]
                }

            default:
                return state;
        }
}