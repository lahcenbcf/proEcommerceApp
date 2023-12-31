const express=require("express")
const productRouter=express.Router()
const {protect}=require("../middleWares/userAuth")
const {getAllProducts,getUnicProduct,createProductReview,getTopProducts}=require("../controllers/productController")
//@desc Fetch all products
//@route GET/products
//@access Public
productRouter.get("/",getAllProducts)

productRouter.get("/top",getTopProducts)
//@desc one product
//@route GET/products/:productId
//@access Public
productRouter.get('/:productId',getUnicProduct)
productRouter.post("/createReview/:productId",protect,createProductReview)
module.exports={productRouter}