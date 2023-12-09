import {useSelector} from 'react-redux'
import {Outlet,Navigate} from "react-router-dom"

function PrivateRoute() {
    const {user}=useSelector(store => store.userDetails)
  return (
    <>
    {user._id ? <Outlet /> : <Navigate to={"/signIn"} />}
    </>
  )
}

export default PrivateRoute
