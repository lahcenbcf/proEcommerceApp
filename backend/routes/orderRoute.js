const express=require('express')
const { createOrder,getOrderById, updateOrderToPaid } = require('../controllers/orderController')
const {protect}=require("../middleWares/userAuth")
const orderRouter=express.Router()

orderRouter.post("/createorder",protect,createOrder)
orderRouter.get("/:id",protect,getOrderById);
orderRouter.post("/:id/pay",protect,updateOrderToPaid)
module.exports={orderRouter}