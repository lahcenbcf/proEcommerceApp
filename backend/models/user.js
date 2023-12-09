const mongoose=require("mongoose")
const bcrypt=require("bcrypt")
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        required:true,
        default:false
    },
    status:{
        type:Boolean,
        default:false
    }

})

userSchema.methods.matchPassword=async function(enteredPassowrd){
     return await bcrypt.compare(enteredPassowrd,this.password)
}

userSchema.pre("save",async function(next){
    //when we update user info mybe we have to check if password changed
    if(!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(Number(process.env.BCRYPT_SALT))
    const hashedPassword=await bcrypt.hashSync(this.password,salt)
    this.password=hashedPassword
    
})

const UserModal=mongoose.model("UserModal",userSchema)
module.exports={
    UserModal
}