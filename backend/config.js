const mongodb=require("mongodb")
const dotEnv=require('dotenv').config()
const {MongoClient}=mongodb
const mongoUrl=process.env.mongoUrl;
const mongoose=require('mongoose')
const client=new MongoClient(mongoUrl)
 const connect=async()=>{
        /*client.connect().then(()=>{
                app.listen(5000,()=>console.log("is running"))
        }).catch(e=>console.log(e))*/
        try {
                await mongoose.connect(mongoUrl)   
                console.log("connected")   
        } catch (error) {
               console.log(error) 
        }
        
}

module.exports={
    connect
}
