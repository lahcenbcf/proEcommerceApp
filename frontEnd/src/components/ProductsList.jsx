import {Swiper,SwiperSlide} from "swiper/react"
import 'swiper/css';
import ProductItem from "./ProductItem";
function ProductsList({products}) {
  return (
    <div className="container mx-auto py-6 overflow-hidden px-4">
    <h1 className="mb-4">Latest Products</h1>
      <div className="grid grid-cols-fluid gap-[4rem]">
      {
        products.map((prod,index)=>(
          
                <ProductItem key={prod._id} {...prod} />
       
        ))
    }
      </div>
       
   
    </div>
  )
}

export default ProductsList
