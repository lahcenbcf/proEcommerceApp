import { useEffect,useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import OrderItem from "../components/OrderItem"
import Spinner from "../utils/Spinner"
import { getOrderById } from "../actions/orders"
import { useNavigate, useParams } from "react-router-dom"
import OrderSummary from "../components/OrderSummary"

function OrderDetailsScreen() {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {loading,success,error,orderinfo}=useSelector(store => store.orderDetails)
  const {cart:{shippingAdress,paymentMethod,cartItems}}=useSelector(store => store.cart)
  const {id}=useParams()
  const {user}=useSelector(store => store.userDetails)
  const totalPrice=useMemo(()=>{
    var initialPrice=0;
    if(orderinfo.orderItem){
      orderinfo.orderItem.forEach(item=>initialPrice+=item.price);
    }
    
    return initialPrice
  }
  )
  const tax=Number(totalPrice * 0.11)

  const totalItems=useMemo(()=>{
    var initialItems=0;
    if(orderinfo.orderItem){
      orderinfo.orderItem.forEach(item=>initialItems+=item.qty);
    }
    
    return initialItems
  })
  useEffect(()=>{
    //check if the order belong to userId session
    if(orderinfo.ownerUser != user._id){
      navigate("/")
    }else{
    dispatch(getOrderById(id))
    }
  },[])
  return (
    <div className="container mx-auto p-4">
    {loading && <Spinner />}
    {!success ? <p className="text-red-500">{error}</p> : <div>
    <h1>{"ORDER "+orderinfo._id}</h1>
    <div className="flex flex-wrap">
        <div className="max-w-xl">
            {/* SHIPPING */}
            <div className="my-4">
                <h2 className="font-semibold my-3">SHIPPING</h2>
                <p><span className="text-slate-400 font-semibold">Adress : </span>{shippingAdress.adress}</p>
                <p><span className="text-slate-400 font-semibold">Email : </span>{shippingAdress.email}</p> 

            </div>
            {/* PAYMENT METHOD */}
            <div className="mb-6">
                <h2 className="font-semibold my-3">PAYMENT METHOD</h2>
                <p>{paymentMethod}</p> 
                {orderinfo.isPaid ? <p className=" text-green-600">paid at {orderinfo.paidAt}</p> : <p className="text-red-500">pending</p>} 
                {/* isDelivered  */}
                {orderinfo.isDelivered ? <p className=" text-green-600">delivered at {orderinfo.deliveredAt}</p> : <p className="text-red-500">pending</p>}   
            </div>
            {/* ORDER ITEMS */}
            <div>
              <h2 className="font-semibold">ORDER ITEMS</h2>
              <ul>
                  {
                    <ul className="list-none">{
                      orderinfo.orderItem.map(item => (
                        <OrderItem name={item.name} product={item.product} image={item.image} unit_price={item.unit_price} price={item.price} qty={item.qty} />
                      ))
                    }</ul>
                  }
              </ul>
            </div>
        </div>
    </div>

    {/* Order Summary */}
    <OrderSummary tax={tax} totalItems={totalItems} totalPrice={totalPrice} />
    </div> }
    </div>
  )
}

export default OrderDetailsScreen
