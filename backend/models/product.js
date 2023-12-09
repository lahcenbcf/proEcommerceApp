const mongoose=require('mongoose')

const reviewSchema=new mongoose.Schema({
    desc:{
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
const ImageSchema=new mongoose.Schema({
    data:{
        type:Buffer,
        required:true
    },
    extName:{
        required:true,
        type:String
    }

})
const ImageModel=new mongoose.model("ImageModel",ImageSchema)
const ProductSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"UserModal"
    },
    name:{
        type:String,
        default:""
    },
    category:{
        type:String,
        default:""
    },
    price:{
        type:String,
        default:"free",
    },
    brand:{
        type:String,
        default:"no brand"
    },
    image:{
        type:Object,
        ref:ImageModel,
        required:true
    },
    description:{
        type:String,
        default:""
    },
    rating:{
        type:Number,
        default:0
    },
    countInStock:{
        type:Number,
        default:0
    },
    numReviews:{
        type:Number,
        default:0
    },
    reviews:{
        type:Array,
        ref:"ReviewModal",
        default:[]
    }
    
})


const ProductModal=mongoose.model("ProductModal",ProductSchema)
module.exports={
    ProductModal
}