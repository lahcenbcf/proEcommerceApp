import { logoutUser } from '../actions/user';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  sideBarAnimation,
  sideBarItemAnimation,
} from '../animations/sideBarAnim';
import { useDispatch, useSelector } from 'react-redux';
function SideBar() {
  const dispatch=useDispatch()
  const { userInfo } = useSelector((state) => state.login);
  const navigate=useNavigate()
  const logout=()=>{
    dispatch(logoutUser())
    navigate("/signIn")
  }
  return (
    <motion.div
      variants={sideBarAnimation}
      initial="hidden"
      animate="show"
      exit="exit"
      className="md:hidden fixed top-0 left-0 h-full w-full bg-white flex flex-col items-center gap-10 justify-center"
    >
      {userInfo?._id && (
        <Link to={`/cart/${userInfo?._id}`}>
          <motion.h2 variants={sideBarItemAnimation} className="text-secondary">
            cart
          </motion.h2>
        </Link>
      )}
      {userInfo?._id ? (
        <button onClick={logout}>
          <motion.h2
            variants={sideBarItemAnimation}
            className=" text-secondary"
          >
            signout
          </motion.h2>
        </button>
      ) : (
        <Link to={'/signIn'} className="">
          <motion.h2
            variants={sideBarItemAnimation}
            className=" text-secondary"
          >
            signIn
          </motion.h2>
        </Link>
      )}
    </motion.div>
  );
}

export default SideBar;
