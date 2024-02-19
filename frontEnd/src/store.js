// here basically we gather all our redcers and try
//to combine theme in one single store
import {createStore,combineReducers,applyMiddleware} from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
//import our product reducer
import { productListReducer, productReducer } from "./reducers/products"
//import our cart reducer
import { CartReducer } from "./reducers/cart"
import { orderDetailsReducer, orderReducer ,orderPaidReducer} from "./reducers/order"
//import our login and register Reducers
import {loginUserReducer,registerUserReducer,userDetailsReducer} from "./reducers/user"
//import unauthorized reducer
import {unauthorized} from "./reducers/user"
import { adminReducer,productAdminReducer,orderAdminReducer } from "./reducers/adminReducer"
const initialState={}

const middleware=[thunk]
const reducer = combineReducers({
   productList:productListReducer,
   productData:productReducer,
   cart:CartReducer,
   login:loginUserReducer,
   register:registerUserReducer,
   authorization:unauthorized,
   userDetails:userDetailsReducer,
   orders:orderReducer,
   orderDetails:orderDetailsReducer,
   adminReducer:adminReducer,
   productAdminReducer,
   orderAdminReducer,
   orderPaidReducer
})

const store=createStore(reducer,initialState,composeWithDevTools(applyMiddleware(
    ...middleware)))


export default store;