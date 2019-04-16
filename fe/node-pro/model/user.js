const mongoose = require("../utils/database").mongoose;

const User = mongoose.model("user",{
    username:String,
    password:String
})


const userFind = (userInfo,cb)=>{

    User.findOne(userInfo).then(result=>{
       
        cb(result)
    })
}

const userSave = (userInfo,cb)=>{
    const user = new User(userInfo);
    user.save().then(result=>{
        console.log(result)
        cb(result)
    })
}


module.exports = {
    userFind,
    userSave
}