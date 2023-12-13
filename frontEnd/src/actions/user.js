import {USER_REQUEST,USER_SUCCESS,USER_FAIL,USER_LOGOUT} from "../constants/userLogin"
import {UNAUTHORIZED} from "../constants/unAuthorizedActions"
import {USERDETAILS_FAIL,USERDETAILS_REQUEST,USERDETAILS_SUCCESS,CLEAR_USER_DETAILS} from "../constants/userDetails"
import {placeholderApi} from "./products"
//login action
export const loginUser=(email,password)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:USER_REQUEST
        })
        const user=await placeholderApi.post("/user/signIn",{
            email,password
        },{
            headers:{
                "Content-Type":"application/json"
                //here after moments we will send our authorization token in
                //protected route
            }
        });
        if(user.data?.message){
            dispatch({
                type:USER_FAIL,
                payload:user.data.message
            })
        }else{
            dispatch({
                type:USER_SUCCESS,
                payload:user.data
            })

            //save our userData to localStorage
            localStorage.setItem("user",JSON.stringify(getState().login.userInfo))
        }

    } catch (error) {
     dispatch({
        type:USER_FAIL,
        payload:error.message
     })   
    }
}

//logout user
export const logoutUser=()=>async(dispatch)=>{
    try {
        dispatch({
            type:USER_REQUEST
        })
        const res=await placeholderApi.get("/user/logout")
        if(res?.message){
            dispatch({
                type:USER_FAIL,
                payload:res.message
            })
        }
        else{ 
            dispatch({
                type:CLOSE_LOGIN_SESSION
            })
            dispatch({
            type:CLEAR_USER_DETAILS
        })
    }
        //remove from local storage
        localStorage.removeItem("user");
    } catch (error) {
        dispatch({
            type:USER_FAIL,
            error:error.message
        })
    }
}

//register user
export const registerUser=(email,password,username)=>async(dispatch)=>{
    try {
        dispatch({
            type:USER_REQUEST
        })
        const response=await placeholderApi.post("/user/register",{
            email,
            username,
            password
        },{
            headers:{
            "Content-Type":"application/json"
            }
        })

        if(response.data?.message){
            dispatch({
                type:USER_FAIL,
                payload:response.data.message
            })
        }else{
            dispatch({
                type:USER_SUCCESS,
                payload:true
            })
        }
    } catch (error) {
        dispatch({
            type:USER_FAIL,
            payload:error.message
        })
    }
}


//get userProfile

export const getUserProfile=()=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:USERDETAILS_REQUEST
        })
        const {login:{userInfo}}=getState()
        const res=await placeholderApi.get("/user/getUserProfile",{
            //here we will pass our authorization token Bearer
            headers:{
                Authorization:`Bearer ${userInfo.token}`
            }
        });
        if(res.data?.message){
            dispatch({
                type:UNAUTHORIZED,
                payload:res.data?.message
            })
        }else{
            dispatch({
                type:USERDETAILS_SUCCESS,
                payload:res.data
            })
        }
    } catch (error) {
        dispatch({
            type: UNAUTHORIZED,
            payload:error.message
        })
    }
}


//update userData
export const updateUserProfile=(name,email,password)=>async(dispatch,getState)=>{
    try {
        dispatch({
            type:USERDETAILS_REQUEST
        })
        const res=await placeholderApi.put("/user/updateUserProfile",{
            email,password,name
        },{
                headers:{
                    Authorization:`Bearer ${getState().login.userInfo.token}`
                   }
                
            }
        
        )
        if(res.data?.message){
            dispatch({
                type:USERDETAILS_FAIL,
                payload:res.data.message
            })
        }else{
            dispatch({
                type:USERDETAILS_SUCCESS,
                payload:res.data
            })

            //set Local storage
            localStorage.setItem("user",JSON.stringify(res.data))
        }
    } catch (error) {
        dispatch({
            type:USERDETAILS_FAIL,
            payload:error.message
        })
    }
}