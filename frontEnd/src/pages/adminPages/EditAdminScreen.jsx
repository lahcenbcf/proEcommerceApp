import { Link, useNavigate, useParams } from "react-router-dom"
import {editUserStatus, getUserById} from "../../actions/admin"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ADMIN_ACTION_ERROR } from "../../constants/AdminActions"
import Spinner from "../../utils/Spinner"
import Toastify from "toastify";

var firstRender=true;

function EditAdminScreen() { 

  
  const [isEdit,setIsEdit]=useState(false)
  Toastify.setOption('position','top-left')
  const {data,loading,success}=useSelector(store => store.adminReducer)
  const {userId}=useParams()

  const dispatch=useDispatch()
  const navigate=useNavigate()
  const [formData,setFormData]=useState({
    name:"",
    email:"",
    isAdmin:false
  })
  const changeHandler=(e)=>{
    e.preventDefault()
    if(e.target.name =="username"){
      setFormData({
        ...formData,
        name:e.target.value
      })
    }else if(e.target.email=="email"){
      setFormData({
        ...formData,
        email:e.target.value
      })
    }else if(e.target.name == "checkbox"){
      setFormData({
        ...formData,
        isAdmin:e.target.checked
      })
    }
  }


  const submitFormData=(e)=>{
    e.preventDefault();
    try {
      console.log(formData)
      if(!formData.email || !formData.name) return Toastify.error("the fields are empty");
      if((formData.email == data?.user?.email) && (formData.name == data?.user?.name) && (formData.isAdmin == data?.user?.isAdmin)) return Toastify.error("nothing to update")

    dispatch(editUserStatus(userId,formData))
    if(success){
      
      navigate("/admin")
      setIsEdit(true)
    }
    } catch (error) {
      dispatch({
        type:ADMIN_ACTION_ERROR,
        payload:error.message
      })
    }
  }
  //I will bring user info of current session to avoid fetcing data that I already have
  const {user}=useSelector(store=>store.userDetails)
  useEffect(()=>{
      if(user._id != userId && !user.isAdmin){
        dispatch(getUserById(userId))
      }
  },[dispatch])

  useEffect(()=>{
    if(isEdit){
      Toastify.success("data changed successufully")
    }
  },[isEdit,data])
  useEffect(()=>{
    if(typeof(data)=="object"){
      setFormData({
        name:data?.user?.name,
      email:data?.user?.email,
      isAdmin:data?.user?.isAdmin
      })
    }
   
  },[data])

  return (
    <>
    {
      loading && <Spinner />
    }
    <div className="container mx-auto w-full p-4">
    <Link to={"/admin"} className="font-bold text-lg">Go back</Link>
    <div className="max-w-lg w-full mx-auto mt-10">
        <h1>EDIT USER</h1>
        <form onSubmit={submitFormData} method="PUT">
            <div className="inputGroup my-4">
                <label className="text-lg font-semibold block mb-3">Name :</label>
                <input type="text" placeholder="name" name="username" onChange={changeHandler} className="px-2 py-4 outline-none bg-slate-50 w-full" value={formData.name} />
            </div>
            <div className="inputGroup my-4">
                  <label className="text-lg font-semibold block mb-3">Email :</label>
                  <input type="email" name="email" placeholder="email" onChange={changeHandler} className="px-2 py-4 outline-none bg-slate-50 w-full" value={formData.email} />
            </div>
            <div className="flex gap-3 my-4 items-center">
            <input type="checkbox" name="checkbox" onChange={changeHandler} checked={formData.isAdmin} />
            <label className="text-lg font-semibold block mb-3">is Admin</label>
            </div>
            <button type="submit" className="px-6 py-3 bg-slate-800 text-white font-bold text-lg" >update</button>
        </form>
    </div>
    </div>
    </>
  )
}

export default EditAdminScreen
