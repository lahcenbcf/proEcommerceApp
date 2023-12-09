const mongoose=require('mongoose')
const orderItemSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true,
        default:0
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"ProductModal"
    }
})

const OrderItemModal=mongoose.model("OrderItemModal",orderItemSchema)
const OrderSchema=new mongoose.Schema({
    orderOwner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"UserModal",
        required:true
    },
    orderItem:{
        type:Array,
        ref:"OrderItemModal",
        required:true,
        default:[]
    },
    totalPrice:{
        type:Number,
        required:true,
        default:0.0
    },
    taxPrice:{
        type:String,
        required:true,
        default:"0"
    },
    shippingPrice:{
        type:String,
        required:true,
        default:"0"
    },
    shippingAdress:{
        adress:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        pc:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        }
    },
    paymentMethod:{
        type:String,
        required:true,
        default:"visa"
    },
    /*paymentResult:{
        id:{
            type:String
        },
        status:{
            type:String
        },
        updateTime:{
            type:String
        },
        emailAdr:{
            type:String
        }
    },*/
    isDelivered:{
        type:Boolean,
        required:true,
        default:false
    },
    deliveredAt:{
        type:Date,
        required:true,
        default:new Date()
    },
    isPaid:{
        type:Boolean,
        required:true,
        default:false
    },
    paidAt:{
        type:Date,
        required:true,
        default:new Date()
    },
    date:{
        type:Date,
        required:true,
        default:new Date()
    }

},{
    timestamps:true
},)



const OrderModal=mongoose.model("OrderModal",OrderSchema)

module.exports={
      OrderModal
}