import React from 'react'
import { useDispatch } from 'react-redux'
import { addCartItem ,removeCartItem} from '../actions/cart'
import {AiFillDelete} from "react-icons/ai"
function CartItem(props) {
  const dispatch=useDispatch()
  const removeItemFromCart=()=>{
    dispatch(removeCartItem(props.name))
  }
  const pickItemsNumber=(e)=>{
    dispatch(addCartItem(props.product._id,Number(e.target.value)))
  }
  return (
    <div className='max-w-md px-4 py-3 rounded-md bg-slate-200 shadow-xl flex gap-4 my-3 items-start'>
    <div className='imageWrapper w-24 h-24'>
    <img className='w-[100%] h-full object-cover' src={`data:image/${props.image.extName};base64,${props.image.data}`} alt={props.product.name} />
    </div>
   <h4 className='font-semibold max-w-[10ch] mx-4'>{props.product.name}</h4>
   <h5 className='font-bold text-slate-500'>{Math.round(props.price,2)} $</h5>
   <select onChange={pickItemsNumber} className="select select-ghost w-[40px] rounded-none max-w-xs outline-none bg-inherit p-0 border-none">
  <option value={props.qty}>{props.qty}</option>
  <option value={1}>1</option>
  <option value={2}>2</option>
  <option value={3}>3</option>
  <option value={4}>4</option>
  <option value={5}>5</option>
</select>
{/*icon delete */}
<AiFillDelete className='mt-4' onClick={removeItemFromCart} />
    </div>
  )
}

export default CartItem
