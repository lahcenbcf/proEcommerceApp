const {UserModal}=require("../models/user")
const {ProductModal}=require("../models/product");
const { OrderModal } = require("../models/order");
const fs=require("fs")
const path=require("path")
//DESC:GET ALL users
//@route get
//@access private
const getAllUsers=async(req,res)=>{
    try {
        const allUsers=await UserModal.find();
        res.status(200).json({
            users:allUsers
        })
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

//@Desc get all the orders to display them in order list
//@route /admin/getAllOrders
//@access private

const getAllOrders=async (req,res)=>{
    try {
        const orders=await OrderModal.find()
        res.json(orders);
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

//pending ----> not exist

//DESC:delete user
//@route delete
//@access private
const deleteUser=async(req,res)=>{
    try {

       
        const {userId}=req.params
        const isDeleted=await UserModal.deleteOne({
            _id:userId
        })
        //the response forùat : { acknowledged: true, deletedCount: 1 }
        if(isDeleted.acknowledged){
            res.send(true)
        }else{
            res.json({
                message:"something went wrong"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}


//DESC:edit user status
//@route patch
//@access private
//pending ----> active
const confirmUser=async(req,res)=>{
    try {
        const {newUserInfo}=req.body
        console.log(newUserInfo)
        const {userId}=req.params
        const updatedUser=await UserModal.updateOne({
            _id:userId
        },{$set:{
            ...newUserInfo
        }})
        //console.log(user)
        /*{
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}*/
    if(updatedUser.acknowledged){
        res.send(true)
    }else{
        res.json({
            message:"something went wrong"
        })
    }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}   

//@des get all products
//route /admin/getAllProducts
//@access private
const getAllProducts=async(req,res)=>{
    try {
        const prods=await ProductModal.find()
        res.status(200).json({
            products:prods
        })
    } catch (error) {
        res.json(
            {
                message:error.message
            }
        )
    }
}

//@DESC delete product
//@ROUTE /admin/deleteProduct/productId
//@access private
const deleteProduct=async(req,res)=>{
    try {
        const {productId}=req.params;
        const result = await ProductModal.deleteOne({
            _id:productId
        })
        if(result.acknowledged){
            res.send(true)
        }else{
            res.json({
                message:"something went wrong"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

//@Desc create a new product
//@ROUTE /admin/createProduct
//@access private
const createProduct=async(req,res)=>{
    try {
        const {adminId}=req.body
        const newProduct=new ProductModal({
            owner:adminId
        })
        const product =await newProduct.save()
        if(product){
            res.json(product)
        }else{
            res.json({
                message:"something went wrong"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

//@Desc update a product
//@ROUTE /admin/updateProduct/:productId
//@access private
const updateProduct=async(req,res)=>{
    try {
        const {name,category,brand,price,description,rating,countInStock,imagePath}=req.body
        const imageBuffer=fs.readFileSync(path.join(path.resolve()+imagePath));
        const result =await ProductModal.findByIdAndUpdate(req.params.productId,{
            $set:{
                name,price,
                category,
                brand,
                rating,
                description,
                countInStock,
                image:
                {
                    extName:imagePath.split(".")[1],
                    data:imageBuffer
                }
            }
        })
       if(result){
        return res.send(true)
       }else{
        res.json({
            message:"message went wrong"
        })
       }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}
module.exports={
    getAllUsers,
    deleteUser,
    confirmUser,
    getAllProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    getAllOrders
}
