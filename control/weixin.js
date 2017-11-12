var request = require('request');
var User = require('../model/user');
var authMiddleWave = require('../middleware/auth');

var token = "1234567890abcdefgh"; //..........

// path: /weixin
exports.weixin_home = function(req, res, next) {
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
}

// path: /MP_verify_FfjmvluhDdcVqMqe.txt
exports.mp_verify = function(req, res, next) {
  res.sendfile('MP_verify_FfjmvluhDdcVqMqe.txt');
}

var AppID = 'wx29114cbbfc3c86d3';
var AppSecret = 'a9b3e90064d5e5a44e4de6c3a4990c16';
var Scope = 'snsapi_userinfo';
var MyUrl = "http://www.act101.cn"

// path: /mysq
exports.mysq = function(req, res, next) {
    var redirect = MyUrl + "/mysq_r";
    res.redirect(302, 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+encodeURI(redirect)+'&response_type=code&scope='+Scope+'&state=STATE#wechat_redirect');
}

// path: /mysq_r
exports.mysq_r = function(req, res, next) {
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
}

// path: /service
exports.service = function(req, res, next) {
    //var kfyyId = req.query.kfyyId;
    var redirect = MyUrl + "/service_r";
    res.redirect(302, 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppID+'&redirect_uri='+encodeURI(redirect)+'&response_type=code&scope='+Scope+'&state=STATE#wechat_redirect');
}


exports.service_r = function(req, res, next) {
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
                if (typeof(data.openid) != 'undefined') {
                    (async () => {
                        var objs = await User.query({openId: openid});

                        if (objs.length > 0) {
                            var user = {
                                role: "user",
                                roleId: objs[0].id
                            };

                            authMiddleWave.gen_session(user, res);

                            res.render('service', { title: '服务' });
                            return;
                        }
                    }) ()
                }

                request.get(
                    {
                        url:'https://api.weixin.qq.com/sns/userinfo?access_token='+access_token+'&openid='+openid+'&lang=zh_CN',
                    },
                    function(error, response, body){
                        if(response.statusCode == 200){

                            var userinfo = JSON.parse(body);
                            console.log("userinfo="+JSON.stringify(userinfo));

                            if (typeof(userinfo.openid) != 'undefined') {
                                (async () => {
                                    var gender = 'male';
                                    if (userinfo.sex != 1) {
                                        gender = 'female';
                                    }

                                    var newUser = {
                                        wx_name: userinfo.nickname,
                                        openId: userinfo.openid,
                                        gender: gender,
                                        country: userinfo.country,
                                        province: userinfo.province,
                                        city: userinfo.city,
                                    };

                                    objs = await User.newAndSave(newUser);
                                    if (!objs) {
                                        res.render('error', { title: '服务' });
                                        return;
                                    }
                                    var user = {
                                        role: "user",
                                        roleId: objs.id
                                    };

                                    authMiddleWave.gen_session(user, res);
                                    res.render('service', { title: '服务' });
                                }) ()
                            }
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
}
