const dotEnv=require("dotenv")
const {UserModal}=require("./models/user")
const {ProductModal}=require("./models/product")
const {OrderModal}=require("./models/order")
const {connect}=require("./config")
const {users}=require("./data/users")
const {products}=require("./data/products")
connect()
const importData=async()=>{
    try {
        await ProductModal.deleteMany()
        await OrderModal.deleteMany()
        const createdUsers=await UserModal.insertMany(users);
        const admin=createdUsers[0]._id;
        const sampleProducts=products.map(prd=>
        {
            return {...prd,owner:admin}
        
        }
        )
        await ProductModal.insertMany(sampleProducts)
        console.log("data imported")
    } catch (error) {
        console.log(error.message)
    }
    
}
dotEnv.config()

importData()