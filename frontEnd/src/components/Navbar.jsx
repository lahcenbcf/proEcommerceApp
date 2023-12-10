import { Link } from "react-router-dom"
import {BsFillCartFill} from "react-icons/bs"
import {BiSolidUser} from "react-icons/bi"
import {AiOutlineMenu , AiOutlineClose} from "react-icons/ai"
import { useState } from "react"
import SideBar from "./SideBar"
import { useSelector } from "react-redux"
const Navbar = () => {
    const [toggleBar,setToggleBar]=useState(false)
    const {userInfo}=useSelector(store => store.login)
  return (
    <header className="bg-background text-text w-full">
    <nav className="container mx-auto nav shadow-lg flex items-center justify-between py-4 px-3 relative">
    {/* menuBar icon */}
    <div className="absolute left-2 top-4 mr-10 z-20 bg-white text-secondary p-3 rounded-full md:hidden" onClick={()=>setToggleBar(!toggleBar)}>
    {
        toggleBar ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />
    }

    </div>
   
        
    {/* logo */}
    <Link to={"/"}>
    <h1 className="pl-12 md:pl-0">PROSHOP</h1>
    </Link>
        
        {/* items */}
        <ul className="hidden md:flex md:gap-8">
        <li>
        <Link to={"/cart"} className="flex items-center gap-2">
        <BsFillCartFill size={20} />
        <h3 className="">cart</h3>
            </Link>
        </li>


        <li>
        {userInfo._id && 
            <details className="dropdown">
  <summary className="text-lg mt-1">Admin</summary>
  <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52 text-black font-bold">
    <li><Link to={"/admin"}>users</Link></li>
    <li><Link to={"/admin/productList"}>products</Link></li>
    <li><Link to={"/admin/orderList"}>orders</Link></li>
  </ul>
</details>
        }
</li>
<li>
        <Link to={"/signIn"} className="flex items-center gap-2">
            <BiSolidUser size={20} />
            <h3>{userInfo._id ? "logout" : "signIn"}</h3>

            </Link>
        </li>
            
        </ul>

    </nav>
    {/* sideBar */}
    {
        toggleBar && <SideBar />
    }
    </header>
    
  )
}

export default Navbar
