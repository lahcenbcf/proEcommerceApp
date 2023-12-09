import { useDispatch, useSelector } from "react-redux"
import CheckoutMap from "../components/CheckoutMap"
import {createOrder} from "../actions/orders"
import {useNavigate } from "react-router-dom"
import OrderItem from "../components/OrderItem"
import Spinner from "../utils/Spinner"
import OrderSummary from "../components/OrderSummary"
import { resetCartItems } from "../actions/cart"
function OrderScreen() {
  const navigate=useNavigate()
  const {loading,success,order}=useSelector(store=>store.orders)
  const {cart:{paymentMethod,shippingAdress,cartItems}}=useSelector(store => store.cart)
  if(!cartItems) navigate("/")
  if(!shippingAdress) navigate("/shipping")
  if(!paymentMethod) navigate("/payment")
  //if(!paymentMethod) navigate("/payment")
  
  const dispatch=useDispatch()
  const totalPrice=cartItems.reduce((acc,item)=>
    acc+=item.price,0)
    //the problem is when I refresh the page success is false so placeOrder page will not move to the orderPage
  if(success) navigate(`/order/${order._id}`)
  const tax=Number(totalPrice * 0.11)

  const totalItems=cartItems.reduce((acc,item)=>
    acc+=item.qty,0)
  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(createOrder({
      orderItems:cartItems,
      shippingAdress,
      paymentMethod,
      totalItems,
      taxPrice:0.15*totalPrice+"$",
      shippingPrice:totalPrice < 100 ? "0$" :"10$",
      totalPrice
    }))

    //reset the cartItems
    dispatch(resetCartItems())
  }


  return (
    <div className="container mx-auto p-4">
    {loading && <Spinner />}
    <CheckoutMap step1 step2 step3 />
<div className="flex gap-6">
    <div>
    {/* SHIPPING ADDRESS */}
    <div className="my-3">
        <h2>SHIPPING</h2>
        <p className="text-slate-400 mb-2">{"Adress : "+shippingAdress.adress}</p>
        <hr />
    </div>
    <div className="">
        <h2>PAYMENT METHOD</h2>
        <p className="text-slate-400 mb-2">{"Mehtod : "+paymentMethod}</p>
        <hr />
    </div>

    {/* order items */}
    <h2>ORDER ITEMS</h2>
    <ul className="list-none">{
      cartItems.map(item => (
        <OrderItem name={item.name} product={item.product} image={item.image} unit_price={item.unit_price} price={item.price} qty={item.qty} />
      ))
    }</ul>
        </div>   

        {/* order summary */}
        <OrderSummary totalItems={totalItems} submitHandler={submitHandler} totalPrice={totalPrice} tax={tax} />
        
      </div>
    </div>
  )
}

export default OrderScreen
