import {useDispatch,useSelector} from "react-redux"
import {logoutUser} from "../actions/user"
function Logout() {
    const {success}=useSelector(store=>store.resgister)
    const dispatch=useDispatch()
    const LogoutUser=(e)=>{
      e.preventDefault();
      dispatch(logoutUser())
    }
  return (
    <div>
      <button onClick={LogoutUser} >logout </button>
    </div>
  )
}

export default Logout
