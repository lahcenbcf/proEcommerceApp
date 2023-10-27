import React from 'react'
import { Link } from 'react-router-dom'
import {motion} from "framer-motion"
import { sideBarAnimation , sideBarItemAnimation } from '../animations/sideBarAnim'
function SideBar() {
  return (
    <motion.div variants={sideBarAnimation} initial="hidden" animate="show" exit="exit" className='md:hidden fixed top-0 left-0 h-full w-full bg-white flex flex-col items-center gap-10 justify-center'>

    <Link  to={"/cart"} className="">
        
        <motion.h2 variants={sideBarItemAnimation} className="text-secondary">cart</motion.h2>
            </Link>
            <Link to={"/signIn"} className="">
            
            <motion.h2 variants={sideBarItemAnimation} className=' text-secondary'>signIn</motion.h2>
            </Link>
      
    </motion.div>
  )
}

export default SideBar
