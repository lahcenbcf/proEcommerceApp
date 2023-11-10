import { useEffect, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import {useLocation, useParams} from "react-router-dom"
import { addCartItem } from "../actions/cart"
import CartItem from "../components/CartItem"
import DisplayTotalCart from "../components/DisplayTotalCart"
function CartScreen() {
    const location=useLocation()
    const {id}=useParams()
    const qty=location.search ? location.search.split("=")[1] : 1
    const dispatch=useDispatch()
    const {items,error,empty}=useSelector(store=>store.cart)
    useEffect(()=>{
        dispatch(addCartItem(id,qty))
    },[dispatch,qty,id])
    const totalData=useMemo(()=>{
        var totalPrice=0;
        var totalItems=0
        items.forEach(item=>{
            totalPrice+=item.price;
            totalItems+=item.qty;
        })
        return {totalItems,totalPrice}
    })
  return (
    <div className="container mx-auto p-4 flex flex-wrap">
    <div className="cartItemsWrapper flex-fluid">
      {
        empty ? <h2>your cart is empty</h2> : (
            error ? <h3>{error}</h3>:
        items.map(item=>(
        <CartItem key={item.name} {...item} />)
      ))}
      </div>


      {/* cartItems Total Display */}
      { items.length && <DisplayTotalCart {...totalData}  /> }
    </div>
  )
}

export default CartScreen
