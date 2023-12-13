import ProductItem from "./ProductItem";
import { Link } from "react-router-dom";
function ProductsList({products}) {
  return (
    <div className="container mx-auto py-6 overflow-hidden px-4">
    <h1 className="my-6 font-medium uppercase">Latest Products</h1>
      <div className="grid grid-cols-fluid gap-6">
      {
        products.length ?
        products.map((prod,index)=>(
          
                <ProductItem key={prod._id} {...prod} />
       
        ))
        : <p>no items found <Link to="/">Go back</Link></p>
    }
      </div>
       
   
    </div>
  )
}

export default ProductsList
