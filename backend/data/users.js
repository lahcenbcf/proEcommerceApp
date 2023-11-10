const bcrypt=require("bcrypt")
const users=[
    {
        name:"admin999",
        email:"admin@gmail.com",
        password:bcrypt.hashSync("passhhword",10),
        isAdmin:true
},
    {
        name:"johnndjk",
        email:"john@gmail.com",
        password:bcrypt.hashSync("passwommrd",10),
        isAdmin:true
    },
    {
        name:"leojde",
        email:"leo@gmail.com",
        password:bcrypt.hashSync("passwordlll",10),
        isAdmin:true
    }
]

module.exports={
    users
}