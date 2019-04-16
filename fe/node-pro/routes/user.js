var express = require('express');
var router = express.Router();
var userController = require("../controller/user");
//注册接口
router.post("/register",userController.register);
//登陆接口
router.post("/login",userController.login);
module.exports = router;
