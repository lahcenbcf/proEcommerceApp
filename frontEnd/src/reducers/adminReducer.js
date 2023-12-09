import  {START_ACTION,ADMIN_ACTION_ERROR,
    ADMIN_ACTION_SUCCESS,
    UPDATE_ORDER_TO_PAID,
    ADD_USERS_TO_LIST,UPDATE_USER_ADMIN_LIST,
    ADD_PRODUCTS_TO_ADMIN_LIST,
    DELETE_PRODUCT_FROM_ADMIN_LIST,
    PENDING_PRODUCT_ACTION,
    PRODUCT_ACTION_ERROR,
    PRODUCT_ACTION_SUCCESS,
    CREATE_PRODUCT,
    ORDER_ADMIN_ACTION_PENDING,
    ORDER_ADMIN_FAIL,
    ORDER_ADMIN_SUCCESS,
    UPDATE_ORDER_STATUS
} from "../constants/AdminActions"
const initialState={
    loading:false,
    success:true,
    data:null,
    userList:[],
    error:""
}

export const adminReducer=(state=initialState,action)=>{
    switch (action.type) {
        case START_ACTION:
            return {
                ...state,
                success:false,
                loading:true,
                error:""
            }
        case UPDATE_ORDER_TO_PAID:
            return {
                ...state,
                loading:false
            }

        case ADMIN_ACTION_SUCCESS:
            return {
                ...state,
                loading:false,
                success:true,
                data:action.payload
            }
        case ADMIN_ACTION_ERROR:
            return {
                ...state,
                error:action.payload,
                loading:false,
                success:false
            }
        case ADD_USERS_TO_LIST:
            return {
                ...state,
                userList:action.payload
            }
        case UPDATE_USER_ADMIN_LIST:{
            const userList=state.userList.filter(user => user._id != action.payload)
            return {
                ...state,
                userList
            }
        }
    
        default:
            return state
    }
}

const initialState2={
    productList:[],
    loading:false,
    success:false
}
export const productAdminReducer=function(state=initialState2,action){
    switch (action.type) {
        case PENDING_PRODUCT_ACTION:
            return {
                ...state,
                loading:true
            }
        case ADD_PRODUCTS_TO_ADMIN_LIST:
            state.productList=action.payload
            return {
                ...state,
                loading:false
            }
        case CREATE_PRODUCT:
            state.productList.push(action.payload)
            return {
                ...state,
                loading:false
            }
        case DELETE_PRODUCT_FROM_ADMIN_LIST:
            const productId=action.payload
            state.productList=state.productList.filter(p=>p._id !=productId )
            return {
                ...state,
                loading:false
            }
        case PRODUCT_ACTION_SUCCESS:
            return {
                ...state,
                loading:false,
                success:true
            }
        case PRODUCT_ACTION_ERROR:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:
            return state;
    }
}

//orders
const initialState3={
    orderList:[],
    loading:false,
    success:false
}

export const orderAdminReducer=(state=initialState3,action)=>{
    switch (action.type) {
        case ORDER_ADMIN_ACTION_PENDING:
            return {
                ...state,
                success:false,
                loading:true
            }
        case ORDER_ADMIN_SUCCESS:
            return {
                ...state,
                success:true,
                loading:false,
                orderList:action.payload
            }
        case ORDER_ADMIN_FAIL:
            return {
                ...state,
                loading:false,
                error:action.payload

            }
        case UPDATE_ORDER_STATUS:
            state.orderList=state.orderList.map(order => {
                if(order._id == action.payload){
                    order.isPaid=true
                    order.isDelivered=true
                    order.paidAt=new Date()
                    order.deliveredAt=new Date()
                }
            })
            return {
                ...state,
                success:true,
                loading:false
            }
        default:
            return state
    }
}