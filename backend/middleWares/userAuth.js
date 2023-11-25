const jwt=require("jsonwebtoken")
const {UserModal}=require("../models/user")

const protect=async (req,res,next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            token=req.headers.authorization.split(' ')[1]
            const decoded=jwt.verify(token,process.env.JWT_TOKEN_SECRET)
            req.user = await UserModal.findById(decoded.id).select('-password')
            console.log('passed');
            next()
        } catch (error) {
            console.error(error)
            res.status(401).json({
                message:'Not authorized, token failed'
            })
            
        }
    }

    if(!token){
        //send back unauthorized response
        res.status(401).json({
            message:"not authorized to do this action"
        })
        
    }

  
}

module.exports={protect}