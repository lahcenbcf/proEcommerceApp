import { useRef } from "react"
import {Link} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {registerUser} from "../actions/user"
import Spinner from "../utils/Spinner"
import GoToLogin from "../utils/GoToLogin"
function RegisterScreen() {
    const usernameRef=useRef()
    const emailRef=useRef()
    const passRef=useRef()
    const confirmPassRef=useRef()
    const dispatch=useDispatch()
    const {loading,error,success}=useSelector(store=>store.register)
    const RegisterHandler=(e)=>{
        e.preventDefault()
        if(!usernameRef.current.value || !emailRef.current.value || !passRef.current.value || passRef.current.value != confirmPassRef.current.value) return;
        dispatch(registerUser(emailRef.current.value,passRef.current.value,
            usernameRef.current.value))
    }
    console.log(success)
  return (
    <>

    {success ? <GoToLogin /> :
    <div>
    {/* spinner loader */}
    {loading && <Spinner />}
    <div className="max-w-lg min-h-screen mx-auto my-32 rounded-md shadow-lg p-4">
    <h1 className="mb-6 text-slate-600">SIGN UP</h1>
    {/* erreur message */}
    {error && <p className="text-red-500">{error}</p>}
    <form onSubmit={RegisterHandler}>
    <div className="inputGroup my-4">
        <label htmlFor="username" className=" mt-6 mb-2">username</label>
        <input ref={usernameRef} id="username" type="text" placeholder="username" className="px-6 py-3 outline-none w-full bg-slate-100 placeholder:text-slate-500 mt-3" />
    </div>
    <div className="inputGroup mb-4">
        <label htmlFor="email">email </label>
        <input ref={emailRef} id="email" type="email" placeholder="email" className="px-6 py-3 outline-none w-full bg-slate-100 placeholder:text-slate-500 mt-3" />
    </div>
    <div className="inputGroup mb-4">
        <label htmlFor="password" className="mt-6 mb-2">password</label>
        <input ref={passRef} id="password" type="password" placeholder="password" className="px-6 py-3 outline-none w-full bg-slate-100 placeholder:text-slate-500 mt-3" />
    </div>
    <div className="inputGroup mb-4">
        <label htmlFor="confirm" className="mt-6 mb-2">password</label>
        <input ref={confirmPassRef} id="confirm" type="password" placeholder="confirm-password" className="px-6 py-3 outline-none w-full bg-slate-100 placeholder:text-slate-500 mt-3" />
    </div>
    <button type="submit" className="px-4 py-2 bg-black text-white my-3">Register</button>
    </form>
    <p className="text-slate-600">have an account <Link to="/signIn" className="underline text-black font-semibold">sign In</Link></p>
</div>
    </div>

  }
    </>
    
    
  )
}

export default RegisterScreen
