const {UserModal}=require("../models/user")
const {generateToken}=require("../utils/generateToken")
//@desc auth user with email and password
//@route POST /user/signIn
//@access Public
const authUser=async(req,res)=>{
    const {email,password}=req.body
    try {
        const user=await UserModal.findOne({
            email
        })
        if(user && (await user.matchPassword(password))){
           return res.json({
                _id:user._id,
                name:user.name,   
                email:user.email,
                isAdmin:user.isAdmin,
                token:generateToken(user._id)
            })
        }
        else{
            return res.json({
                message:"invalid mail or password"
            })
            // this Error will go to catch block
           /* throw new Error(
            "invalid mail or password"
            )*/
        }
    } catch (error) {
        res.json({
            message:error.message
        })
        /*throw new Error(
            error.message
        )*/
    }
    
}

//@desc getUSER profile
//@route GET /user/getProfile
//@access private
const getUserProfile=async(req,res)=>{
    try {
        const user=await UserModal.findById(
            req.user._id
        )
        if(user){
            res.json({
                name:user.name,
                email:user.email,
                _id:user._id,
                isAdmin:user.isAdmin
            })
        }else{
            res.status(404).json({
                message:"user not found"
            })
        }
    } catch (error) {
        res.status(400).json({
            message:"something went wrong"
        })
    }
   
    
}


//@desc register user
//@route POST /user/register
//@access public
const registerUser=async(req,res)=>{
    const {email,password,username}=req.body

    try {
        const userExist=await UserModal.findOne(
             {email}
        )

        if(userExist){
            res.json({
                message:"we have already an account with this mail"
            })
        }else{
            const user=await UserModal.create({
                name:username,
                email,
                password
            })
            if(user){

                res.status(201).json({
                    success:`user created successufuly ${user._id}`
                })
            }else{
                //may be we can have a problem with data are not valid
                res.json({
                    message:"invalid user data"
                })
            }
        }
    } catch (error) {
        res.json({
            message:error.message
        })

    }
}


//@desc logout user
//@Route GET /user/logout
//@access public
const logoutUser=(req,res)=>{
    try {
        res.send(true)
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}



//@desc update user profile
//@Route put /user/updateProfile
//@access private 
const updateUserProfile=async(req,res)=>{
    try {
        //we get the userId from authUser Middleware
        const userId=req.user._id;
        /**if(!req.body.name || !req.body.password || !req.body.email){
            res.json({
                message:"invalid info"
            })

        }*/

        const user=await UserModal.findById(userId);

        if(user){
            //update user Information$
            const {name,email,password}=req.body
            name && (user.name=name);
            email && (user.email=email);
            password && (user.password=password);
            const updateUser=await user.save()
            res.json({
                _id:updateUser._id,
                name:updateUser.name,
                email:updateUser.email,
                isAdmin:updateUser.isAdmin,
                token:generateToken(updateUser._id)
            })
        }else{
            res.status(404).json({
                message:"error"
            })
        }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
}

//@desc getUser by ID
//@route GET/user/:id
//@access private /Admin
const getUserById=async(req,res)=>{
    //for the moment I use userId from params
    const id=req.params.userId;
    //const userId=req.user._id
    try {
        const user=await  UserModal.findById(id);
    if(user){
        return res.status(200).json({
            user
        })
    }else{
        return res.status(400).json({
            message:"user not found"
        })
    }
    } catch (error) {
        res.json({
            message:error.message
        })
    }
    
}
module.exports={
    authUser,
    getUserProfile,
    registerUser,
    logoutUser,
    updateUserProfile,
    getUserById
}