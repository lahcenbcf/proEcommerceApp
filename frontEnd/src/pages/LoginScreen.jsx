import {useEffect, useRef} from "react"
import {useDispatch,useSelector} from "react-redux"
import {loginUser} from "../actions/user"
import {Link, useNavigate} from "react-router-dom"
import Spinner from "../utils/Spinner"
function LoginScreen() {
    const dispatch=useDispatch()
    const {userInfo,error,loading,success}=useSelector(store=>store.login)
    const emailRef=useRef()
    const passRef=useRef()
    const navigate=useNavigate()
    const authUser=(e)=>{
        e.preventDefault()
        if(!emailRef.current.value || !passRef.current.value) return;
        dispatch(loginUser(emailRef.current.value,passRef.current.value))
    }

    useEffect(()=>{
        if(success){
            window.location.href="/"
        }
    },[success])

    useEffect(()=>{
            if(userInfo?._id) navigate("/")
    },[userInfo?._id])

  return (
    <>
    {
        loading && <Spinner />
    }
    <div className="max-w-lg mx-auto border border-1 rounded-sm shadow-md p-4 my-32">

    <h1 className="text-slate-700 mb-6">SIGN IN</h1>
    {/* error message */}
    {error && <p className="text-red-500">{error}</p>}
    {/* login form */}
    <form onSubmit={authUser}>
        <div className="inputGroup email">
            <label htmlFor="email" className=" block mb-2">Email</label>
            <input ref={emailRef} id="email" type="email" placeholder="email" className="px-6 py-3 bg-slate-100 placeholder:text-slate-500 w-full outline-none" />
        </div>
        <div className="inputGroup passowrd">
        <label htmlFor="password" className="block mb-2 mt-4">Password</label>
            <input ref={passRef} id="password" type="password" placeholder="password" className="px-6 py-3 bg-slate-100 placeholder:text-slate-500 mb-4 w-full outline-none" />
        </div>
        <button type="submit" className="p-2 text-white bg-slate-800 rounded-sm mt-2 mb-4">Sign In</button>
    </form>
    <p className="text-slate-500">you haven't account yet ? <Link to={"/register"} className="font-semibold text-black underline">Register now</Link></p>
</div>
    </>
    
    
  )
}

export default LoginScreen
