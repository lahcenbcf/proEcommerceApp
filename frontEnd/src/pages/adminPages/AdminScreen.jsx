import { useEffect } from "react"
import {useDispatch,useSelector} from "react-redux"
import { getAllUsers,deleteUser} from "../../actions/admin"
import Spinner from "../../utils/Spinner"
import { FaCheck} from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { MdEditSquare,MdDelete } from "react-icons/md";
import {useNavigate} from "react-router-dom"
import { Link } from "react-router-dom";
function AdminScreen() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {userList,loading,error}=useSelector(store=>store.adminReducer)
  const deleteUserFromUserList=(id)=>{
    if(window.confirm("are you sure !")){
      dispatch(deleteUser(id))
    } 
  }
  const editUserOfUserList=(id)=>{
    if(window.confirm("are you sure")){
      navigate(`/admin/editUser/${id}`);
    }
  }
  useEffect(()=>{
    dispatch(getAllUsers())
  },[dispatch])
  return (
    <div>
      {/* check for errors */}
      {loading ? <Spinner /> : (
      error ?
      
        <div role="alert" className="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>Error! Task failed .</span>
  <Link to="/admin">return</Link>
</div>
      
      :
        <div className="p-4">
        <h1>USERS</h1>
            <table className="w-full border">
            <thead>
                <tr>
                  <th className="border-2 px-6 py-2 text-slate-400">Email</th>
                  <th className="border-2 px-6 py-2 text-slate-400">Name</th>
                  <th className="border-2 px-6 py-2 text-slate-400">ID</th>
                  <th className="border-2 px-6 py-2 text-slate-400">ADMIN</th>
                </tr>
            </thead>
            <tbody>
                {
                  
                  userList?.map(user=>(
                    <tr className="border-2 bg-slate-100">
                        <th className="border-2 px-6 py-2">{user.email}</th>
                        <th className="border-2 px-6 py-2">{user.name}</th>
                        <th className="border-2 px-6 py-2">{user._id}</th>
                        <th className="border-2 px-6 py-2 flex gap-3">
                        
                        {user.isAdmin ? <FaCheck color="green" /> : <FaXmark color="red" />}
                        <div className="flex">
                        <MdDelete onClick={()=>deleteUserFromUserList(user._id)} size={20} style={{backgroundColor:"white",color:"red",padding:2}} />
                        <MdEditSquare onClick={()=>editUserOfUserList(user._id)} size={20} style={{backgroundColor:"white",color:"green",padding:2}} />
                        </div>
                        </th>
                    </tr>
                  ))
                }
            </tbody>
            </table>
          </div>
         
      
    ) }
    </div>
  )
}

export default AdminScreen
