require('dotenv').config()
const mongoUrl=process.env.MONGO_URL;
const mongoose=require('mongoose')
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
