const userModel = require("../model/user");
/* 加密 1*/
const crypto = require('crypto');

const AuthToken = require("../utils/Auth");
//第一步  token
//const JWT = require("jsonwebtoken");
/*
    post请求的时候接受数据的时候通过  req.body进行接受
    get 请求的时候接受数据的时候通过  req.query进行接受
*/


/* 
    加密的方式
        md5加密   有加密  也有解密
        sha256加密  只有加密  没有解密

*/
const register = (req,res)=>{
    let {username,password} = req.body;
    //需要判断用户名是否存在
    userModel.userFind({username},(result)=>{
        if(result){
            res.json({
                status:false,
                info:"用户名已存在"
            })
        }else{


            //创建加密模式 sha256  2
            const hash = crypto.createHash('sha256');
            //加密的数据  3
            hash.update(password);
            //加密的结果  4
            //console.log(hash.digest('hex'));
            userModel.userSave({username,password:hash.digest('hex')},(result)=>{
                if(result){
                    res.json({
                        status:true,
                        info:"注册成功"
                    })
                }
            })
        }
    })
}


/*
    1、接受前端传递过来的username  password
    2、验证username是否存在
    3、如果存在 验证password(加密)  不存再返回给用户 用户名不存在
    4、如果密码验证成功   则 返回 登陆成功  验证失败则  返回  密码错误
 
*/

const login = (req,res)=>{
    let {username,password} = req.body;

    userModel.userFind({username},function(result){
        if(result){
            const hash = crypto.createHash('sha256');
            hash.update(password);

            if(result.password == hash.digest('hex')){


                let payload = {
                    username,
                }
                let secret = "BK1821";

                //第二步  token
               //let token =  JWT.sign(payload,secret,{expiresIn:"1h"})
               res.cookie("token",AuthToken.setToken(payload,secret));
               res.cookie("user",username);


                res.json({
                    status:true,
                    info:"登陆成功",
                    user:username
                })
            }else{
                res.json({
                    status:false,
                    info:"密码错误"
                })
            }
        }else{
            //不存在
            res.json({
                status:false,
                info:"用户名不存在"
            })
        }
    })
}

module.exports = {
    register,
    login
}




