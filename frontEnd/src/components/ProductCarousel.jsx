import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getTopProducts } from "../actions/products";
import Loader from "./Loader";
import { useParams } from "react-router-dom";

function ProductCarousel() {
    const {topRatedProducts,loading,error}=useSelector(store=>store.productList);
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getTopProducts())
    },[dispatch])
  return (
    <>
    {loading ? <Loader />  : (
            error ? <p>{error}</p> : 
            <div className="carousel carousel-center flex justify-center gap-[14] border max-w-2xl w-full mx-auto rounded-box px-10 py-6">
            {
                    topRatedProducts.map(product => (
                        <div key={product._id} className="carousel-item flex flex-col w-full mx-auto">
                                <img className="w-[20rem] min-h-[90%]" src={`data:image/${product.image.extName};base64,${product.image.data}`} alt={product.name} />
                                {/* product title */}
                                <h1>{product.name}</h1>
                        </div>
                    ))
            }
    </div>
    )}
    
    </>
    
  )
}

export default ProductCarousel
