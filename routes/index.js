var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var request = require('request');
var user = require('../control/user');
var auth = require('../middleware/auth');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* RESTful api START */
router.get('/user/getVerCode', user.sendSMS);
router.post('/user/vcLogin', user.verCodeLogin);
router.get('/user/logout', auth.userRequired, user.logout);
router.get('/user/:id', auth.userRequired, user.getone);
router.put('/user/:id', auth.userRequired, user.update);
/* RESTful api END */


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

router.get('/MP_verify_FfjmvluhDdcVqMqe.txt', function(req, res, next) {
  res.sendfile('MP_verify_FfjmvluhDdcVqMqe.txt');
});

var AppID = 'wx29114cbbfc3c86d3';
var AppSecret = 'a9b3e90064d5e5a44e4de6c3a4990c16';
var Scope = 'snsapi_userinfo';
var RedirectUrl = "http://www.act101.cn/mysq_r"

router.get('/mysq', function(req, res, next) {
  res.redirect(302, 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+encodeURI(RedirectUrl)+'&response_type=code&scope='+Scope+'&state=STATE#wechat_redirect');
});

router.get('/mysq_r', function(req, res, next) {
    var code = req.query.code;
    request.get(
        {   
            url:'https://api.weixin.qq.com/sns/oauth2/access_token?appid='+AppID+'&secret='+AppSecret+'&code='+code+'&grant_type=authorization_code',
        },
        function(error, response, body){
            if(response.statusCode == 200){
                var data = JSON.parse(body);
                var access_token = data.access_token;
                var openid = data.openid;

		//console.log("body="+body);
		//console.log("access_token="+access_token+",openid="+openid);
                request.get(
                    {
                        url:'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN',
                    },
                    function(error, response, body){
                        if(response.statusCode == 200){

                            var userinfo = JSON.parse(body);
                            //console.log("userinfo="+JSON.stringify(userinfo));

                            res.send("\
                                <h1>"+userinfo.nickname+" .....</h1>\
                                <p><img src='"+userinfo.headimgurl+"' /></p>\
                                <p>"+userinfo.city+"."+userinfo.province+"."+userinfo.country+"</p>\
                            ");

                        }else{
                            console.log(response.statusCode);
                        }
                    }
                );
            }else{
                console.log(response.statusCode);
            }
        }
    );
});

module.exports = router;
