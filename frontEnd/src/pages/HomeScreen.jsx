import React  ,{ useEffect} from 'react'
import ProductsList from '../components/ProductsList'
import {useSelector,useDispatch} from "react-redux"
import {listProducts} from "../actions/products"
import Spinner from '../utils/Spinner'
function HomeScreen() {
  const dispatch=useDispatch()
  const productList=useSelector(store => store.productList)
  const {loading,error,products}=productList
  useEffect(()=>{
    dispatch(listProducts())
  },[dispatch])
  return (
    <div className='min-h-screen'>
    {
      loading ? <Spinner />: (
        error ? <p>{error}</p> : 
        <ProductsList products={products} />
      )
    }
    </div>
  )
}

export default HomeScreen
