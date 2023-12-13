import React from 'react'
import {Link} from "react-router-dom"
import Rating from "./Rating"


function ProductItem({
    name,image,_id,rating,numReviews,price,reviews
}) {
  return (
    <Link to={`/products/${_id}`}>
    <div className='border-2 border-slate-300 rounded-sm p-3 cursor-pointer max-w-sm w-full'>
    
    <img className='h-[20rem] max-w-[100%] scale-[90%] mx-auto object-cover border border-slate-400 shadow-md rounded-md' src={`data:image/${image.extName};base64,${image.data}`} alt={name} />
      <div className='my-3 px-8'>
      <h3 className='font-semibold my-2'>{name}</h3>
      <Rating value={rating} text={`${numReviews} reviews`} />
    <h2>{`${price} US`}</h2>
      </div>
      
     
    </div>
    </Link>
    
  )
}

export default ProductItem
