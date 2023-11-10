const {ProductModal}=require("../models/product")
const getAllProducts=async(req,res)=>{
    try {
        const products=await ProductModal.find()
        res.json(products)
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

const getUnicProduct=async(req,res)=>{
    try {
        const product=await ProductModal.findById(req.params.productId);
        if(product){
            res.json(product)
        }else{
            throw new Error("product not found")
        }
    } catch (error) {
        
        res.status(error.code || 404).json({
            message:error.message
        })
    }
}
module.exports={getAllProducts,getUnicProduct}