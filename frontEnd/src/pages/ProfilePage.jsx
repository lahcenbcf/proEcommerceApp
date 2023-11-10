import {useSelector,useDispatch} from "react-redux"
import {getUserProfile,updateUserProfile} from "../actions/user"
import { useEffect, useRef } from "react"
import {Navigate} from "react-router-dom"
import Spinner from "../utils/Spinner"
function ProfilePage() {
    const emailRef=useRef()
    const nameRef=useRef()
    const passRef=useRef()
    
    const confirmPassRef=useRef()
    const dispatch=useDispatch()
    const {loading,error,user}=useSelector(store=>store.userDetails)
    const updateUser=(e)=>{
        e.preventDefault()
        if(!emailRef.current.value && !nameRef.current.value && !passRef.current.value)return;
        dispatch(updateUserProfile(nameRef.current.value,emailRef.current.value,passRef.current.value))
    }
    const {userInfo}=useSelector(store=>store.login)
    useEffect(()=>{
        if(!userInfo){
            //pour assurer que user has a session
Navigate({
    to:"/signIn"
})
        }else{
        dispatch(getUserProfile())
        }
    },[dispatch])
  return (
    <>
    {loading && <Spinner />}
    {error && <p>{error}</p>}
    {
        user && <div className="min-h-screen container mx-auto p-4">
        <h1>USER PROFILE</h1>
        <p className=" bg-slate-100 rounded-sm w-fit px-3 py-1 font-semibold border border-slate-400">{user.name}</p>
        <form className="max-w-md px-4 py-2">
        {/* USer name */}
            <div className="inputGroup mb-3">
                <label className="block">Name</label>
                <input ref={nameRef} className="border border-none bg-slate-200 px-4 py-2 rounded-sm outline-none" type="text" placeholder="Enter name" />
            </div>
            {/* User email */}
            <div className="inputGroup mb-3">
            <label className="block">email</label>
            <input ref={emailRef} className="border border-none bg-slate-200 px-4 py-2 rounded-sm outline-none" type="email" placeholder="Enter email" />
        </div>
        {/* password */}
        <div className="inputGroup mb-3">
        <label className="block">password</label>
        <input ref={passRef} className="border border-none bg-slate-200 px-4 py-2 rounded-sm outline-none" type="password" placeholder="Enter password" />
    </div>
    {/* confirm password */}
    <div className="inputGroup mb-3">
    <label className="block">Confirm password</label>
    <input ref={confirmPassRef} className="border border-none bg-slate-200 px-4 py-2 rounded-sm outline-none" type="password" placeholder="confirm password" />
</div>
<button className="p-3 bg-black text-white" onClick={updateUser}>UPDATE</button>
        </form>
    </div>
    }
    
    </>
    
  )
}

export default ProfilePage
