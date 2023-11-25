const express=require('express')
const { createOrder } = require('../controllers/orderController')
const {protect}=require("../middleWares/userAuth")
const orderRouter=express.Router()

orderRouter.post("/createorder",protect,createOrder)

module.exports={orderRouter}