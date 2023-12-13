const {ProductModal}=require("../models/product")
const getAllProducts=async(req,res)=>{
    try {
        //we got the queries using req.query
        const pageSize=10;
        const pageNum=Number(req.query.pageNum) || 1
        const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword,
              $options: 'i',
            },
          }
        : {}

        const count = await ProductModal.countDocuments({
            ...keyword
        })

        const products= await ProductModal.find({
            ...keyword
        }).limit(pageSize).skip(pageSize*(pageNum - 1))
        
        res.json({products,pageNum,pages:Math.ceil(count / pageSize)})

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

//@desc create a review for a product
//@route /product/createReview/:productId
//@access user authentifie
const createProductReview=async(req,res)=>{
    try {
        const {desc,rating}=req.body
        const product=await ProductModal.findById(req.params.productId);
        if(product){
            const alreadyReviewd=product.reviews.find(re => re.user.toString() == req.user._id);
            if(alreadyReviewd){
                return res.status(400).json({
                    message:"already reviewed"
                })
            }
            else{
                const review={
                    desc,
                    rating,
                    user:req.user._id
                }
                const result=await ProductModal.findOneAndUpdate({
                    _id:req.params.productId
                },{
                    $set:{
                        reviews:[...product.reviews,review],
                        numReviews:product.reviews.length +1
                    }
                })
                if(result){
                    res.send(true)
                }
                else{
                    res.json({
                        message:"something went wrong"
                    })
                }
            }
        }else{
            res.status(404).json({
                message:"product not found"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}


//@Desc get best rating products
//@route GET /products/top
//acess public
const getTopProducts=async(req,res)=>{
    try {
        const products=await ProductModal.find({}).sort({
            rating:-1
        }).limit(3)
        res.status(200).json(products)
    } catch (error) {
        return res.json({
            message:error.message
        })
    }
}
module.exports={getAllProducts,getUnicProduct,createProductReview,getTopProducts}