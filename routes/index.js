var express = require('express');
var crypto = require('crypto');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var token = "1234567890abcdefgh"; //..........

/* GET home page. */
router.get('/weixin', function(req, res, next) {
  
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
  
    /*  ../....... */
    //1. .token.timestamp.nonce...........
    var array = new Array(token,timestamp,nonce);
    array.sort();
    var str = array.toString().replace(/,/g,"");
  
    //2. ..................sha1..
    var sha1Code = crypto.createHash("sha1");
    var code = sha1Code.update(str,'utf-8').digest("hex");
  
    //3. ..............signature.............
    if(code===signature){
        res.send(echostr)
    }else{
        res.send("error");
    }
});

module.exports = router;
