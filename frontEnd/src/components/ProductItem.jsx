import React from 'react'
import {Link} from "react-router-dom"
import Rating from "./Rating"
function ProductItem({
    name,image,_id,rating,numReviews,price,reviews
}) {
  return (
    <Link to={`/products/${_id}`}>
    <div className='border-2 border-slate-300 rounded-sm p-3 cursor-pointer'>
    
    <img className='h-[20rem] w-full object-cover border border-slate-400 shadow-md' src={image} alt={name} />
      <h3 className='font-semibold my-2'>{name}</h3>
      <Rating value={rating} text={`${numReviews} reviews`} />
    <h2>{`${price} US`}</h2>
     
    </div>
    </Link>
    
  )
}

export default ProductItem
