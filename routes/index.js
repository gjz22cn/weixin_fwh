var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var user = require('../control/user');
var kfyy = require('../control/kfyy');
var config = require('../config');
var auth = require('../middleware/auth');
var weixin = require("../control/weixin");
var maintain = require("../control/maintain");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/rolemain', function(req, res, next) {
    console.log("get /rolemain");

    if (!req.session || !req.session.user) {
        res.render('login', {title: '关爱社区'});
        return;
    }
    console.log("get /rolemain2");

    console.log(JSON.stringify(req.session.user));

    switch(req.session.user.role) {
        case "system":
            res.render('main_admin', {title: '关爱社区'});
            break;
        case "kfyy":
            res.render('main_kfyy', {title: '关爱社区'});
            break;
        case "shequ":
            res.render('main_shequ', {title: '关爱社区'});
            break;
        case "user":
            res.render('main_user', {title: '关爱社区'});
            break;
        default:
            res.render('login', {title: '关爱社区'});
    };
});


/* RESTful api START */
router.get('/user/getVerCode', user.sendSMS);
router.post('/user/vcLogin', user.verCodeLogin);
router.get('/user/logout', auth.userRequired, user.logout);
router.get('/user/:id', auth.userRequired, user.getone);
router.put('/user/:id', auth.userRequired, user.update);

router.post('/kfyy', auth.userRequired, kfyy.add);
router.post('/kfyy/order', auth.userRequired, kfyy.order);
router.get('/kfyy/namelist', auth.userRequired, kfyy.getNameList);
router.get('/kfyy', auth.userRequired, kfyy.get);
router.get('/kfyy/:id', auth.userRequired, kfyy.getone);
router.put('/kfyy/:id', auth.userRequired, kfyy.update);
router.delete('/kfyy/:id', auth.userRequired, kfyy.delete);
/* RESTful api END */


/* weixin related START */
router.get('/weixin', function(req, res, next) {
    weixin.weixin_home(req, res, next);
});

router.get('/MP_verify_FfjmvluhDdcVqMqe.txt', function(req, res, next) {
    weixin.mp_verify(req, res, next);
});

router.get('/mysq', function(req, res, next) {
    weixin.mysq(req, res, next);
});

router.get('/mysq_r', function(req, res, next) {
    weixin.mysq_r(req, res, next);
});

router.get('/service', function(req, res, next) {
    weixin.service(req, res, next);
});

router.get('/service_r', function(req, res, next) {
    weixin.service_r(req, res, next);
});
/* weixin related END */


/* maintain related START */
router.get('/create_admin', function(req, res, next) {
    maintain.create_admin(req, res, next);
});
/* maintain related END */

module.exports = router;
