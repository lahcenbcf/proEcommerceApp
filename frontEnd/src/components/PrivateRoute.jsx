import {useSelector} from 'react-redux'
import {Outlet,Navigate} from "react-router-dom"

function PrivateRoute() {
    const {userInfo}=useSelector(store => store.login)
  return (
    <>
    {userInfo ? <Outlet /> : <Navigate to={"/signIn"} />}
    </>
  )
}

export default PrivateRoute
