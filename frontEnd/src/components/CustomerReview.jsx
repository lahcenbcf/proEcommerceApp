import { useState } from "react"
import {AddReviewToProduct} from "../actions/products.js"
import {useDispatch, useSelector} from "react-redux"
import Spinner from "../utils/Spinner.jsx"
import ReviewItem from "./ReviewItem"
import Loader from "./Loader.jsx"
function CustomerReview({
    numReviews,productId,
    reviews
}){
    const dispatch=useDispatch()
    const {success,loading,error}=useSelector(store => store.productData)
    const [rating,setRating]=useState(1)
    const [comment,setComment]=useState("")
    const selectRating=(e)=>{
        e.preventDefault()
        setRating(e.target.value)
        //console.log(rating)
        //in this case function continue executing so it will print past value
        //of rating
    }
    const submitReview=(e)=>{
        e.preventDefault()
        if(!comment) return;
        dispatch(AddReviewToProduct(productId,{
            desc:comment,
            rating
        }))
    }


  return (
    <>
    {loading ? <Loader /> :(
        error ? <p>error</p> :
    <div className="my-6 max-w-md w-full">
        <h1 className="mb-6 font-bold">REVIEWS</h1>
        {
            numReviews==0 ? <div className="bg-blue-300 text-blue-800 w-full px-6 py-3">No reviews</div> :
            <div className="h-24 overflow-scroll w-full border p-4">
            {
                reviews.map(review=>(
                    <ReviewItem desc={review.desc} rating={review.rating} />
                ))
            }
            </div>
        }
        <h2 className="text-slate-500 text-2xl">WRITE A CUSTOMER REVIEW</h2>
        {/* rating */}
        <div className="my-4">
        <h4 className="text-slate-700">Rating</h4>
        <select value={rating} onChange={selectRating} className="w-20 border my-3 shadow-xl">
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
        </select>
        </div>
        {/* comment */}
        <div className="mb-4">
        <h4 className="text-slate-700">comment</h4>
        <input type="text" className="rounded-sm px-6 py-4 bg-slate-50 text-slate-600 font-bold w-full border outline-none mt-3 " onChange={(e)=>setComment(e.target.value)} />
        </div>
        
        <button onClick={submitReview} className="bg-slate-700 text-white rounded-sm px-6 py-2">SUBMIT</button>
    </div>
    )}
    </>
  )
    
}

export default CustomerReview
