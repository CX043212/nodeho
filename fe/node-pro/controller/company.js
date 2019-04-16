const companyModel = require("../model/company");
const AuthToken = require("../utils/Auth");
const addCompany = (req,res)=>{
    
  let {companyName,companyScale,companySynopsis} = req.body
  let urlPath =  req.files.companyLogo[0].path.replace(/\\/g,"/").replace(/public/,"");

  companyModel.addCompany({
    companyName,
    companyScale,
    companySynopsis,
    companyLogo:urlPath
  },(result)=>{
     if(result){
         res.json({
             status:true,
             info:"添加成功"
         })
     }else{
         res.json({
             status:false,
             info:"添加失败"
         })
     }
  })

}




const companyList = (req,res)=>{
    let token = req.headers["x-token"];
    
    AuthToken.getToken(token,"BK1821",(err)=>{
       
        if(err){
            console.log("12345")
            res.json({
                status:false,
                info:"令牌失效"
            })
        }else{
            console.log("aaaaaa")
            let {page,limit} = req.query;
            //分页
            companyModel.findCompany({page,limit},(data)=>{
                if(data.length>0){
                    //总条目数字
                    companyModel.findCompanyCount((result)=>{
                        let count = result.length;
                            res.json({
                                status:true,
                                data:data,
                                count
                            })
                        
                    })
                }
                
            })
        }
    })


    
}


const modifyCompanyInfo = (req,res)=>{
    let {companyName,companyScale,companySynopsis,_id} = req.body
    let urlPath =  req.files.companyLogo[0].path.replace(/\\/g,"/").replace(/public/,"");
    companyModel.updateCompany({_id},{
        companyName,
        companyScale,
        companySynopsis,
        companyLogo:urlPath
    },(data)=>{
       if(data){
           res.json({
               status:true,
               info:"修改成功"
           })
       }
    })
}


module.exports  = {
    addCompany,
    companyList,
    modifyCompanyInfo
}