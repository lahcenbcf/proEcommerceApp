import { useEffect, useState } from "react"
import { useSelector,useDispatch } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"
import { getProduct } from "../../actions/products"
import Spinner from "../../utils/Spinner"
import { placeholderApi } from "../../actions/products"
import  Toastify  from "toastify"
import { editProduct } from "../../actions/admin"
function CreateProduct() {
  const [productName,setProductName]=useState("")
  const [category,setCategory]=useState("")
  const [rating,setRating]=useState(0)
  const [price,setPrice]=useState("")
  const [desc,setDesc]=useState("")
  const [brand,setBrand]=useState("")
  const [imagePath,setImagePath]=useState("")
  const [countInStock,setCountInStock]=useState(0)
  const [uploading,setUploading]=useState(false)
  const dispatch=useDispatch()
const {productId}=useParams()
const navigate=useNavigate()
  const {productData:data,error,loading}=useSelector(store => store.productData)
  const {user}=useSelector(store => store.userDetails)
  const changeHandler=(e)=>{
    switch (e.target.name) {
      case "name":
          setProductName(e.target.value)
          break;
      case "price":
          setPrice(e.target.value)
          break;
      case "category":
          setCategory(e.target.value)
          break;
      case "description":
          setDesc(e.target.value)
          break;
      case "brand":
        setBrand(e.target.value)
        break;
      case "countInStock":
          setCountInStock(+e.target.value)
          break;
      case "rating":
          setRating(+e.target.value)
          break;
      default:
        break;
    }
  }

  const submitFormProduct=(e)=>{
      e.preventDefault()
      if(!productName||!price||!desc||!rating||!brand||!imagePath||!countInStock||!category){
            return Toastify.error("field required")
      }
      dispatch(editProduct(productId,{
        adminId:user._id,
        name:productName,
        brand,
        category,
        price,
        rating,
        countInStock,
        imagePath
      }))
      console.log("called")
      //we can not check directly success to know if prod is successufuly updated or not we use useEffect
      
  }
  const uploadHandler=async (e)=>{
    const file=e.target.files[0]
    const newFormData=new FormData()
    newFormData.append("image",file)
    //send post request /upload
    setUploading(true)
    const {data}=await placeholderApi.post("/upload",newFormData,{
      headers:{
        "Content-Type":"multipart/form-data"
      }
    })
    setImagePath(data)
    setUploading(false)
  }
  const {success}=useSelector(store=>store.productAdminReducer);
  useEffect(()=>{
    if(typeof(data)=="object"){
        setCategory(data.category);
        setProductName(data.name);
        setRating(data.rating)
        setDesc(data.description)
        setPrice(data.price)
        setCountInStock(data.countInStock)
        setBrand(data.brand)
    }
  },[data])
  useEffect(()=>{
    if(success){
        navigate("/admin/productList")
      }
  },[success])
  useEffect(()=>{
        dispatch(getProduct(productId))
  },[dispatch])
  return (
    <>
    {loading ? <Spinner /> :(
        error ? <div role="alert" className="alert alert-error">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <span>Error! Task failed .</span>
        <Link to="/admin">return</Link>
      </div> :
    <div className="container mx-auto p-4">
      <Link className="font-bold text-lg">Go Back</Link>
      <h1 className="my-4 font-semibold">EDIT PRODUCT</h1>
      <form onSubmit={submitFormProduct} method="POST" className="max-w-lg w-full">
          {/* name input */}
          <div className="inputGroup my-4">
              <label className="block font-semibold">Name :</label>
              <input type="text" onChange={changeHandler} value={productName} placeholder="name" name="name" className="px-4 py-3 w-full bg-slate-50 rounded-sm " />
          </div>
          {/* price input */}
          <div className="inputGroup my-4">
              <label className="block font-semibold">Price :</label>
              <input type="text" onChange={changeHandler} value={price} placeholder="price" name="price" className="px-4 py-3 w-full bg-slate-50 rounded-sm" />
          </div>
          {/* Image input */}
          <div className="inputGroup my-4">
              <input type="text" placeholder="image path Here" onChange={()=>setImagePath(e.target.value)} value={imagePath} className="px-4 py-3 w-full bg-slate-50 rounded-sm"  />
              <label className="block font-semibold">Image :</label>
              <input type="file" onChange={uploadHandler} placeholder="/image/XXX" name="image" className="px-4 py-3 w-full bg-slate-50 rounded-sm" />
          </div>
          {/* brand input */}
          <div className="inputGroup my-4">
              <label className="block font-semibold">Brand :</label>
              <input type="text" onChange={changeHandler} value={brand} placeholder="Brand" name="brand" className="px-4 py-3 w-full bg-slate-50 rounded-sm" />
          </div>
          {/* countInStock input */}
          <div className="inputGroup my-4">
              <label className="block font-semibold">Count in Stock :</label>
              <input type="number" onChange={changeHandler} value={countInStock} placeholder="count In stock" name="countInStock" className="px-4 py-3 w-full bg-slate-50 rounded-sm" />
          </div>
          {/* category input */}
          <div className="inputGroup my-4">
              <label className="block font-semibold">category :</label>
              <input type="text" onChange={changeHandler} name="category" value={category} className="px-4 py-3 w-full bg-slate-50 rounded-sm" />
          </div>
          {/* description input */}
          <div className="inputGroup my-4">
              <label className="block font-semibold">Description :</label>
              <input type="text" onChange={changeHandler} placeholder="Description" value={desc} name="description" className="px-4 py-3 w-full bg-slate-50 rounded-sm" />
          </div>
          {/* rating input */}
          <div className="inputGroup my-4">
              <label className="block font-semibold">rating :</label>
              <input type="number" onChange={changeHandler} placeholder="rating" value={rating} name="rating" className="px-4 py-3 w-full bg-slate-50 rounded-sm" />
          </div>
          <button className="rounded-sm px-6 py-3 bg-slate-900 text-white font-bold">edit</button>
      </form>
    </div>)}
    </>
  )
}

export default CreateProduct
