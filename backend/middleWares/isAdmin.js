const admin=async(req,res,next)=>{
    try {
        const user=req.user
        if(user && user.isAdmin){
            next()
        }else{
            return res.status(401).json({
                message:"not authorized admin action"
            })
        }
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}
module.exports={
    admin
}


//here see line ----> 15
//j'ai pas fait return : without return ghadi j'émmmetre un response 401 represent error une fois ytindica error 
//catch bloc will executed so "Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
//kont nersell response deux fois sema 3labiha kan ytla3 error so next time do return to avoid executing catch