const express=require("express")
const productRouter=express.Router()
const {getAllProducts,getUnicProduct}=require("../controllers/productController")
//@desc Fetch all products
//@route GET/products
//@access Public
productRouter.get("/",getAllProducts)


//@desc one product
//@route GET/products/:productId
//@access Public
productRouter.get('/:productId',getUnicProduct)
module.exports={productRouter}