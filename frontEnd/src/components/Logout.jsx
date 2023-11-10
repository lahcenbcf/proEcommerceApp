import {useDispatch,useSelector} from "react-redux"
import {logoutUser} from "../actions/user"
function Logout() {
    const {success}=useSelector(store=>store.resgister)
  return (
    <div>
      <button>logout </button>
    </div>
  )
}

export default Logout
