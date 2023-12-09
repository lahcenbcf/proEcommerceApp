const {OrderModal}=require('../models/order')
const {format}=require("date-fns")


//@desc create an order by authenticated user
//@ROUTE /post/createorder
//@access private we basically used user token for authentification and in request we return req.userId
const createOrder=async(req,res)=>{
    try {
        const {
            orderItems,
            shippingAdress,
            paymentMethod,
            shippingPrice,
            totalPrice
        }=req.body
        if(!orderItems || !orderItems.length){
            res.json({
                message:"can not place order"
            })
        }


        const newOrder=await OrderModal.create({
            createdAt:format(new Date(), 'MM/dd/yyyy'),
            updatedAt:"",
            orderOwner:req.user._id,
            totalPrice:totalPrice,
            shippingPrice:shippingPrice,
            orderItem:orderItems,
            shippingAdress:shippingAdress,
            paymentMethod:paymentMethod,

        })
        if(newOrder) res.status(201).json({
            message:"order created successufully",
            orderInfo:newOrder
        })
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

//@desc get orderDetails
//@route POST/order/:id
//@access private

const getOrderById=async(req,res)=>{
    try {
        const {id}=req.params
        
        const order=await OrderModal.findById(id)
        res.status(200).json(order)
    } catch (error) {
        res.json({
            message:error.message
        })
    }
    
    
}

//@desc update order to paid (c'est admin qui fait)
//@route GET /order/admin/updateOrderToPaid
//@access private

const updateOrderToPaid=async(req,res)=>{
    try {
        const {id}=req.params;
        const date=new Date();
        const result = await OrderModal.findByIdAndUpdate(id,{
            $set:{
                isPaid:date,
                isPaid:true,
                deliveredAt:date,
                isDelivered:true
            }
        })
        if(result){
            res.send(true)
        }else{
            res.status(400).json({
                message:"something went wrong"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}




module.exports={
    createOrder,
    getOrderById,
    updateOrderToPaid
}