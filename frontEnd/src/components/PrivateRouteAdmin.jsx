import { Outlet } from "react-router-dom"
import {useSelector } from "react-redux"
function PrivateRouteAdmin() {
    const {user}=useSelector(store => store.userDetails)
  return (
    <div>
      {
        user.isAdmin && <Outlet />
      }
    </div>
  )
}

export default PrivateRouteAdmin
