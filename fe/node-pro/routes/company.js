var express = require('express');
var router = express.Router();
var companyController = require("../controller/company");
var multer = require("multer");

// 开始
var storage = multer.diskStorage({
    //第一个方法文件存储的位置
    destination: function (req, file, cb) {
      cb(null, './public/img')
    },
    //第二个是文件命名
    filename: function (req, file, cb) {
      cb(null, Date.now()+ '-' + file.originalname  )
    }
  })
  
var upload = multer({ storage: storage })
//规定当字段可以接受到的图片有多少张
var cpUpload = upload.fields([{ name: 'companyLogo', maxCount: 1 }])
//结束

//增
router.post("/addCompany",cpUpload,companyController.addCompany)
//查
router.get("/companyList",companyController.companyList)
//改 
router.post("/modifyCompanyInfo",cpUpload,companyController.modifyCompanyInfo)
module.exports = router;