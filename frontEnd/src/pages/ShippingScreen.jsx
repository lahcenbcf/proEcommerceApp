import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAdress } from '../actions/cart'
import CheckoutMap from '../components/CheckoutMap'
import { useNavigate } from 'react-router-dom'

function ShippingScreen() {
    const addressRef=useRef()
    const cityRef=useRef()
    const pcRef=useRef()
    const countryRef=useRef()
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {cart:{shippingAdress,cartItems}}=useSelector(store => store.cart)
    const {userInfo:{_id}}=useSelector(state => state.login)
    if(!cartItems.length) navigate(`/cart/${_id}`)

    const continueProcess=(e)=>{
        e.preventDefault()
        if(!addressRef.current.value || !cityRef.current.value || !pcRef.current.value || !countryRef.current.value) return;
        dispatch(saveShippingAdress({
            adress:addressRef.current.value,
            city:cityRef.current.value,
            pc:pcRef.current.value,
            country:countryRef.current.value
        }))
    }
  return (
    <div className='min-h-screen p-4 max-w-2xl mx-auto py-8 mt-24'>
        <CheckoutMap step1={true} step2={true} />
      <h1 className='mb-6'>SHIPPING</h1>
      <form className='shadow-lg px-8 py-2 rounded-sm'>
        {/* ADRESS */}
        <div className='formGroup mb-4'>
                <label className='block font-semibold text-lg mb-2'>Adress</label>
                <input ref={addressRef} defaultValue={shippingAdress.adress} className='w-full px-4 py-2 bg-slate-100 rounded-sm outline-none' placeholder='address' />
        </div>
        <div className='formGroup my-4'>
                <label className='block font-semibold text-lg mb-2'>City</label>
                <input ref={cityRef} defaultValue={shippingAdress.city} className='w-full px-4 py-2 bg-slate-100 rounded-sm outline-none' placeholder='city' />
        </div>
        <div className='formGroup my-4'>
                <label className='block font-semibold text-lg mb-2'>Postal code</label>
                <input ref={pcRef} defaultValue={shippingAdress.pc} className='w-full px-4 py-2 bg-slate-100 rounded-sm outline-none' placeholder='postal code' />
        </div>

        {/* country */}
        <div className='formGroup my-4'>
        <label className='block font-semibold text-lg mb-2'>country</label>
        <input ref={countryRef} defaultValue={shippingAdress.country} className='w-full px-4 py-2 bg-slate-100 rounded-sm outline-none' placeholder='country' />
</div>
<button className='p-3 bg-black text-white font-semibold rounded-sm' onClick={continueProcess}>Continue</button>
      </form>
    </div>
  )
}

export default ShippingScreen
