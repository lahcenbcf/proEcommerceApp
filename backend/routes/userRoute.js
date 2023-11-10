const express=require("express")
const router=express.Router()
const {protect}=require("../middleWares/userAuth")
const {authUser, getUserProfile,registerUser, updateUserProfile}=require("../controllers/userController")
router.post("/signIn",authUser)
router.post("/register",registerUser)
router.get("/getUserProfile",protect,getUserProfile)
router.put("/updateUserProfile",protect,updateUserProfile)

module.exports={
    router
}