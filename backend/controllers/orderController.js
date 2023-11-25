const {OrderModal}=require('../models/order')
const {format}=require("date-fns")


//@desc create an order by authenticated user
//@ROUTE /post/createorder
//@access private we basically used user token for authentification and in request we return req.userId
const createOrder=async(req,res)=>{
    console.log(req.body)
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


module.exports={
    createOrder
}