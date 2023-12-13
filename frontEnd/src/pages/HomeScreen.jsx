import React  ,{ useEffect} from 'react'
import ProductsList from '../components/ProductsList'
import {useSelector,useDispatch} from "react-redux"
import {listProducts} from "../actions/products"
import Spinner from '../utils/Spinner'
import { Link, useParams } from 'react-router-dom'
import Pagination from "../components/Pagination"
import Loader from '../components/Loader'
import ProductCarousel from '../components/ProductCarousel'
function HomeScreen() {
  const dispatch=useDispatch()
  const {pageNum,keyword}=useParams()
  const productList=useSelector(store => store.productList)
  const {loading,error,products}=productList
  useEffect(()=>{
    dispatch(listProducts(keyword,pageNum))
  },[dispatch,keyword,pageNum])
  return (
    <div className='min-h-screen py-16 mt-20'>
    {
      !keyword ? <ProductCarousel /> :
      <Link to={"/"}>go Back</Link>
    }
    {
      loading ? 
      
      (<Loader />)
     : (
        error ? <p>{error}</p> : 
        <ProductsList products={products} />
      )
    }

    {/* pagination */}
    <Pagination />
    </div>
  )
}

export default HomeScreen
