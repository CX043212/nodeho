const mongoose = require("../utils/database").mongoose;

 const Company = mongoose.model("dbJob", {
    "companyLogo": String,
    "companyName": String,
    "companyScale": String,
    "companySynopsis": String,
})


const addCompany = (companyInfo,cb)=>{
   let company =  new Company(companyInfo);
   company.save().then((result)=>{
       cb(result)
   })
}



/*

    100

 page   limit   skip
 1        5      0
 page   limit   skip
 2        5      5
 page   limit   skip
 3        5      10
 page   limit   skip
 4        5      15


 跳过多少条 (page-1)*limit  

*/
//分页companyInfo = {page:"",limit:""}
const findCompany = (companyInfo,cb)=>{
    Company.find().skip((companyInfo.page-1)*companyInfo.limit).limit(Number(companyInfo.limit)).then((data)=>{
        cb(data);
    })
}

//总条目数
const findCompanyCount = (cb)=>{
    Company.find().then((data)=>{
        cb(data);
    })
}

const updateCompany = (conpanyId,modifyCompany,cb)=>{
   
    Company.update(conpanyId,{$set:modifyCompany},).then((result)=>{
        cb(result)
    })
}

module.exports = {
    addCompany,
    findCompany,
    findCompanyCount,
    updateCompany
}