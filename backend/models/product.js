const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    name:{
      type:String,
      required:true,
      default:""  
    },
    rating:{
        type:Number,
        rrequired:true,
        default:0,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"UserModal"
    }
     
})
const ReviewModal=mongoose.model("ReviewModal",reviewSchema)

const ProductSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"UserModal"
    },
    name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        default:false
    },
    price:{
        type:String,
        default:"free",
        required:true
    },
    brand:{
        type:String,
        default:"no brand",
        required:true
    },
    image:{
        type:String,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    countInStock:{
        type:Number,
        required:true,
        default:0
    },
    numReviews:{
        type:String,
        required:true,
        default:0
    },
    reviews:{
        type:Array,
        ref:"ReviewModal",
        required:true,
        default:[]
    }
    
})


const ProductModal=mongoose.model("ProductModal",ProductSchema)
module.exports={
    ProductModal
}