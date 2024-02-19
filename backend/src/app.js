const express=require("express")
const app=express();
const colors=require('colors')
const {connect}=require("../config")
const {notFound,errorHandler}=require("../middleWares/errorHandlers")
const {productRouter}=require("../routes/productRoute")
const {router}=require("../routes/userRoute")
const {orderRouter}=require("../routes/orderRoute")
const {adminRoute}=require("../routes/admin")
const cors=require("cors")
const {uploadRouter}=require("../routes/uploadRouter")
const morgan=require("morgan")
const path=require("path")
//pour capter json objects
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))
const __direname=path.resolve()
app.use("/uploads",express.static(path.join(__direname,"/uploads")))
//morgan
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
}
app.use(cors())
//handeling error
app.use("/user",router)
app.use("/products",productRouter)
app.use("/order",orderRouter)
app.use("/admin",adminRoute)
app.use("/upload",uploadRouter)
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID)
})
app.use(notFound)
app.use(errorHandler)
//connect
connect().then(()=>{
    app.listen(5000,()=>console.log("app is running".cyan.underline))
}).catch((e)=>console.log("error".red.underline.bold));
