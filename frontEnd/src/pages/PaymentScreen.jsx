import { useDispatch, useSelector } from "react-redux"
import CheckoutMap from "../components/CheckoutMap"
import { savePaymentMethod } from "../actions/cart"
import { Navigate } from "react-router-dom"
import { useState } from "react"
function PaymentScreen() {
  const {cart:{
    shippingAdress
  }}=useSelector(store => store.cart)
  if(!shippingAdress) Navigate("/shipping")
  const dispatch=useDispatch()
  //set our paymentMethodState
  const [paymentMethod,setPaymentMethod]=useState("paypal");
  const submitHandler=(e)=>{
    e.preventDefault()
    dispatch(savePaymentMethod(paymentMethod))
  }
  return (
    <div className="container mx-auto p-4">
    <CheckoutMap step1={true} step2={true} />
      {/* our radio button to choose payment Method */}
    <h1 className="mb-6">Payment MEHTOD</h1>
    <form onSubmit={submitHandler} className="flex flex-col items-start gap-4">
      <h4  className="text-slate-400 font-semibold">Select method</h4>
      <div className="formGroup1">
      <input type="radio" value={"paypal or credit card"} onChange={(e)=>setPaymentMethod(e.target.value)} />
      <label>paypal or creditCard</label>
      </div>

      <button className=" bg-black text-white font-semibold my-3 px-4 pt-2 pb-3 outline-none">continue</button>
    </form>
    </div>
  )
}

export default PaymentScreen
