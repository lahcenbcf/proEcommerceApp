import { useDispatch, useSelector } from "react-redux"
import CheckoutMap from "../components/CheckoutMap"
import {createOrder} from "../actions/orders"
import {useNavigate } from "react-router-dom"
import { useMemo } from "react"
import Spinner from "../utils/Spinner"
function OrderScreen() {
  const navigate=useNavigate()
  const {loading}=useSelector(store=>store.orders)
  console.log(loading)
  const {cart:{paymentMethod,shippingAdress,cartItems}}=useSelector(store => store.cart)
  //if(!paymentMethod) navigate("/payment")
  const dispatch=useDispatch()
  const totalPrice=useMemo(()=>{
    var initialPrice=0;
    cartItems.forEach(item=>initialPrice+=item.price);
    return initialPrice
  }
  )

  const tax=Number(totalPrice * 0.11)

  const totalItems=useMemo(()=>{
    var initialItems=0;
    cartItems.forEach(item=>initialItems+=item.qty);
    return initialItems
  }
  )
  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(createOrder({
      orderItems:cartItems,
      shippingAdress,
      paymentMethod,
      totalItems,
      taxPrice:"10$",
      shippingPrice:totalPrice < 100 ? "0$" :"10$",
      totalPrice
    }))
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
        <li>
        <div className="flex py-4 border-b-[1px] border-slate-400 items-center">
          {/* product image */}
          <div className="w-10 h-10  border-slate-600 rounded-sm">
          <img src={item.image} className="w-[100%] h-[100%] object-cover" />
          </div>

          {/* product name */}
          <p className="mx-4 font-semibold">{item.product.name}</p>
          {/* item id */}
          <p>{item.name.split(" ")[1] }</p>

      {/*quantity*/}
      <p className="text-slate-500 mx-4 font-semibold">{item.qty + "*"+ item.unit_price+"$ =" +item.price + "$"}</p>

        </div>
        </li>
      ))
    }</ul>
        </div>   

        {/* order summary */}
      <div className="p-3 border border-slate-400 rounded-sm">
          <h1>ORDER SUMMARY</h1>
          <ul className="flex flex-col gap-4">
          <li className="flex justify-between border-b-[1px] py-3">
            <p>items</p>
            <span>{totalItems}</span>
            
          </li>
          <li className="flex justify-between border-b-[1px] py-3">
            <p>shipping</p>
            <span>{totalPrice < 100 ? "0$" :"10$"}</span>
            
          </li>
          <li className="flex justify-between border-b-[1px] py-3">
            <p>Tax</p>
            <span>{Math.round(tax)+"$"}</span>
            
          </li>
          <li className="flex justify-between border-b-[1px] py-3">
            <p>Total</p>
            {
              totalPrice  + "$"
            }
           
          </li>
          </ul>
          <button onClick={submitHandler} className="bg-black text-white px-3 pb-3 pt-2 my-3 w-full outline-none">place order</button>
      </div>
      </div>
    </div>
  )
}

export default OrderScreen
