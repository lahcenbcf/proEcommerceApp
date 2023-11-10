const express=require("express")
const app=express();
const colors=require('colors')
const {connect}=require("../config")
const {notFound,errorHandler}=require("../middleWares/errorHandlers")
const {productRouter}=require("../routes/productRoute")
const {router}=require("../routes/userRoute")
const cors=require("cors")
//pour capter json objects
app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

app.use(cors())
//handeling error
app.use("/user",router)
app.use("/products",productRouter)
app.use(notFound)
app.use(errorHandler)
//connect
connect().then(()=>{
    app.listen(5000,()=>console.log("app is running".cyan.underline))
}).catch((e)=>console.log("error".red.underline.bold));
