import React, { useEffect, useMemo } from 'react'
import { Link, useParams} from 'react-router-dom'
import Rating from '../components/Rating'
import { getProduct } from '../actions/products'
import { useDispatch, useSelector } from 'react-redux'
import {addCartItem} from "../actions/cart"
import Spinner from '../utils/Spinner'
function ProductPage() {
  const {productId}=useParams()
  const dispatch=useDispatch()
  const {productData,error,loading}=useSelector(store=>store.productData)
  const addToCart=(e)=>{
    dispatch(addCartItem(productData._id));
  }
  useEffect(()=>{
    dispatch(getProduct(productId))
  },[dispatch])

  return (
    <>
    {
      loading ? <Spinner /> : (
        error ? <p>{error}</p> : 
        <div className="container mx-auto my-4 min-h-screen px-4">
    {/* try with single data */}
    <h3 className="my-4 font-semibold text-secondary">Go back</h3>
    <div className="flex flex-wrap gap-[3rem]">
        <img src={productData.image} alt={productData.name} className="w-[24rem] max-h-[30rem] object-cover flex-fluid flex-grow" />
    <div className='flex-fluid max-w-md'>
    <h1 className='font-bold mb-6'>{productData.name}</h1>
        <hr />
        {/* rating */}
        <div className='my-6'>
        <Rating value={productData.rating} text={`${productData.numReviews} reviews`} />
        </div>
        <hr />
        <h3 className='font-semibold my-6'>Price : <span className='text-slate-400'>${productData.price}</span> </h3>
        <hr />
        <p className='my-6 text-slate-400 text-lg'><span className='text-xl font-semibold block text-black'>Description :</span>
        Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant
        </p>
        <button className='px-3 py-2 rounded-sm bg-slate-600 text-white w-32 uppercase shadow-lg' onClick={addToCart}>add to cart</button>
    </div>
        
    </div>
    
    </div>
      )
    }
    </>
    
  )
}

export default ProductPage
