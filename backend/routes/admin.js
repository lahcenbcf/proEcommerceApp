const express=require("express")
const { updateOrderToPaid } = require("../controllers/orderController")
const {getAllUsers, deleteUser,confirmUser, getAllProducts,deleteProduct, createProduct, updateProduct,getAllOrders} =require("../controllers/adminController")
const {getUserById}=require("../controllers/userController")
const {admin}=require("../middleWares/isAdmin")
const { protect } = require("../middleWares/userAuth")
const adminRoute=express.Router()


adminRoute.patch("/updateOrderToPaid/:id",protect,admin,updateOrderToPaid)
adminRoute.get("/getUsers",protect,admin,getAllUsers)
adminRoute.delete("/deleteUser/:userId",protect,admin,deleteUser);
adminRoute.patch("/updateStatus/:userId",protect,admin,confirmUser)
adminRoute.get("/getUserByIdToEdit/:userId",protect,admin,getUserById)
adminRoute.get("/getAllProducts",protect,admin,getAllProducts)
adminRoute.delete("/deleteProduct/:productId",protect,admin,deleteProduct)
adminRoute.post("/createProduct",protect,admin,createProduct)
adminRoute.patch("/updateProduct/:productId",protect,admin,updateProduct)
adminRoute.get("/getAllOrders",protect,admin,getAllOrders)
module.exports={adminRoute}