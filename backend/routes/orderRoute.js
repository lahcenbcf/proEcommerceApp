const express=require('express')
const { createOrder,getOrderById } = require('../controllers/orderController')
const {protect}=require("../middleWares/userAuth")
const orderRouter=express.Router()

orderRouter.post("/createorder",protect,createOrder)
orderRouter.get("/:id",protect,getOrderById);

module.exports={orderRouter}