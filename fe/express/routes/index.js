var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('list', { title: 'abc',date:new Date() });
  // res.write("abc")
  // res.end("你好")
  // res.json({
  //   status:true,
  //   info:"成功"
  // })
});


router.get("/login",function(req,res){
  res.send("hhhhh")
})

module.exports = router;
