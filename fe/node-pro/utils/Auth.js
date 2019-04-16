//第一步  token
const JWT = require("jsonwebtoken");


 const setToken = (payload,secret)=>{
   return JWT.sign(payload,secret,{expiresIn:"1h"})
 }

 const getToken = (token,secret,cb)=>{
     //token验证  如果err存在token验证失败  如果不存在验证成功
    JWT.verify(token, secret, function(err) {
       
       cb(err);
    });
 }
 module.exports  = {
    setToken,
    getToken
 }