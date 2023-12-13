import {FAILPRODUCTLIST,SUCCESSPRODUCTLIST,
    PENDINGPRODUCTLIST,PRODUCT_FAIL,
    PRODUCT_PENDING,PRODUCT_SUCCESS,
    UPDATE_PRODUCT_REVIEW,
    GET_TOP_RATED_PRODUCTS
} from "../constants/productsActions"
const initialState1={
    loading:false,
    products: [],
    success:true,
    error:"",
    pageNum:0,
    pages:0,
    topRatedProducts:[]
}
export const productListReducer=(state=initialState1,action)=>{
    switch(action.type){
        case PENDINGPRODUCTLIST:
            return {...state,loading:true ,
            success:false}
        case SUCCESSPRODUCTLIST:
            return {
                ...state,
                success:true,
                loading:false,
                products:action.payload.products,
                pageNum:action.payload.pageNum,
                pages:action.payload.pages
            }
        case GET_TOP_RATED_PRODUCTS:
            return {
                ...state,
                success:true,
                loading:false,
                topRatedProducts:action.payload
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
    success:false,
    loading:false
}

export const productReducer=(state=initialState2,action)=>{
    switch(action.type){
        case PRODUCT_PENDING:
            return {...state,loading:true,success:false}
        case PRODUCT_SUCCESS:
            return {
                ...state,loading:false,productData:action.payload,success:true
            }
        case UPDATE_PRODUCT_REVIEW:
            state.productData.reviews=[...state.productData.reviews,action.payload]
            state.productData.numReviews++
            return {
                ...state,
                success:true,
                loading:false
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