import {FAILPRODUCTLIST,SUCCESSPRODUCTLIST,PENDINGPRODUCTLIST,PRODUCT_FAIL,PRODUCT_PENDING,PRODUCT_SUCCESS} from "../constants/productsActions"
const initialState1={
    loading:false,
    products: [],
    error:""
}
export const productListReducer=(state=initialState1,action)=>{
    switch(action.type){
        case PENDINGPRODUCTLIST:
            return {...state,loading:true }
        case SUCCESSPRODUCTLIST:
            return {
                ...state,
                loading:false,
                products:action.payload
            }
        case FAILPRODUCTLIST:
            return {
                ...state,
                error:action.payload
            }
        default :
         return state
        
    }
}


const initialState2={
    productData:{},
    error:"",
    loading:false
}

export const productReducer=(state=initialState2,action)=>{
    switch(action.type){
        case PRODUCT_PENDING:
            return {...state,loading:true}
        case PRODUCT_SUCCESS:
            return {
                ...state,loading:false,productData:action.payload
            }
        case PRODUCT_FAIL :
            return {
                ...state,
                loading:false,
                error:action.payload
            }
        default : return state
    }
}