import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllOrders, updateOrderToPaid } from "../../actions/admin"
import Spinner from "../../utils/Spinner"
import { Link } from "react-router-dom"
import {formatDistance , format} from "date-fns"
function OrderAdminScreen() {
    const {orderList,loading,success,error}=useSelector(store => store.orderAdminReducer)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getAllOrders())
    },[])
  return (
    <>
    {loading ? <Spinner /> :(
        error ? <div role="alert" className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! Task failed .</span>
        <Link to="/admin">return</Link>
      </div> :
    <div className="container p-4 mx-auto w-full">
    <h1 className="my-4 font-bold">ORDERS</h1>
    <table className="w-full border">
            <thead>
                <tr>
                    <th className="p-3 border">ID</th>
                    <th className="p-3 border">USER</th>
                    <th className="p-3 border px-16">DATE</th>
                    <th className="p-3 border">TOTAL</th>
                    <th className="p-3 border px-8">PAID</th>
                    <th className="p-3 border">DELIVERED</th>
                </tr>
            </thead>
            {orderList.map(order => (
                <tr className="bg-slate-50" key={order._id}>
                    <th className="p-3 border">{order._id}</th>
                    <th className="p-3 border">{order.orderOwner}</th>
                    <th className="p-3 border">{format(new Date(order.date), "yyyy-MM-dd")}</th>
                    <th className="p-3 border">{order.totalPrice}</th>
                    <th className="p-3 border">{order.isPaid ? formatDistance(new Date(), new Date(order.paidAt), { addSuffix: true }) : <span className="text-red-500">not paid</span>}
                    
                    {!order.isPaid && <button className="bg-slate-100 rounded-sm" onClick={()=>dispatch(updateOrderToPaid(order._id))}>change</button>}
                    </th>
                    <th className="p-3 border flex items-center">
                    <p className="w-20">{order.isDelivered ? formatDistance(new Date(),new Date(order.deliveredAt), { addSuffix: true }) : <span className="text-red-500">pending</span>}</p>
                    
                        <Link to={`/order/${order._id}`} className="px-4 py-3 rounded-sm bg-slate-200">Details</Link>    
                    </th>
                </tr>
            ))}
    </table>
</div>
    )
  }
    </>
    
  )
}

export default OrderAdminScreen
