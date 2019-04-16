var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.get("/goods",(req,res)=>{
  res.send("bbbbb")
})
module.exports = router;
