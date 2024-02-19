import { useEffect } from 'react'
import {useSelector} from 'react-redux'
import {Outlet,Navigate, useNavigate} from "react-router-dom"

function PrivateRoute() {
    const navigate=useNavigate()
    const {user}=useSelector(store => store.userDetails)
    useEffect(()=>{
      if(!user._id) navigate("/signIn")
    },[user._id])
  return (
    <>
    {user._id ? <Outlet /> : <Navigate to={"/signIn"} />}
    </>
  )
}

export default PrivateRoute
