import { useDeferredValue, useEffect } from "react"
import {useSelector,useDispatch} from "react-redux"
import { createProduct, deleteProduct, getAllProducts } from "../../actions/admin"
import { MdEditSquare,MdDelete } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../../utils/Spinner"
function ProductListScreen() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const {productList,loading,error,success}=useSelector(store => store.productAdminReducer)
    const {user}=useSelector(store => store.userDetails)
    const editProductOfProductList=(productId)=>{
        if(window.confirm("are you sure")){
            navigate(`/admin/product/edit/${productId}`)
        }
    }
    const deleteProductFromProductList=(productId)=>{
        if(window.confirm("are you sure !")){
            dispatch(deleteProduct(productId))
        } 
    }

    const createEmptyProduct=()=>{
        dispatch(createProduct(user._id))
    }
    useEffect(()=>{
        if(success){
            navigate("/admin/productList")
          }
    },[success])
    useEffect(()=>{
        dispatch(getAllProducts())
    },[])
  return (
    <div>
      {/* check for errors */}
      {loading ? <Spinner /> : (
      error ?
      
        <div role="alert" className="alert alert-error">
  <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
  <span>Error! Task failed .</span>
  <Link to="/admin">return</Link>
</div>
      
      :
        <div className="p-4">
        <div className="flex justify-between my-6">
            <h1>PRODUCTS</h1>
            <button className="px-4 py-3 bg-black outline-none border-none text-white fontbold text-lg hover:bg-white hover:text-black hover:border border-2 hover:border-black" onClick={createEmptyProduct}>create product</button>
        </div>
            <table className=" table-fixed border-2 mx-auto">
            <thead className="border-2 ">
                <tr>
                  <th className="border-2 px-6 py-2 text-slate-400">ID</th>
                  <th className="border-2 px-6 py-2 text-slate-400">Name</th>
                  <th className="border-2 px-6 py-2 text-slate-400">PRICE</th>
                  <th className="border-2 px-6 py-2 text-slate-400">CATEGORY</th>
                  <th className="border-2 px-6 py-2 text-slate-400">BRAND</th>
                </tr>
            </thead>
            <tbody>
                {
                  
                  productList?.map(p=>(
                    <tr className="border-2 bg-slate-100">
                        <th className="border-2 px-6 py-2">{p._id}</th>
                        <th className="border-2 px-6 py-2">{p.name}</th>
                        <th className="border-2 px-6 py-2">{p.price}</th>
                        <th className="border-2 px-6 py-2">{p.category}</th>
                        <th className="border-2 px-6 py-2 flex gap-3">
                        
                        {p.brand}
                        <div className="flex">
                        <MdDelete onClick={()=>deleteProductFromProductList(p._id)} size={20} style={{backgroundColor:"white",color:"red",padding:2}} />
                        <MdEditSquare onClick={()=>editProductOfProductList(p._id)} size={20} style={{backgroundColor:"white",color:"green",padding:2}} />
                        </div>
                        </th>
                    </tr>
                  ))
                }
            </tbody>
            </table>
          </div>
         
      
    ) }
    </div>
  )
}

export default ProductListScreen
