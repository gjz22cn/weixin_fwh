var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var user = require('../control/user');
var userM = require('../model/user');
var config = require('../config');
var auth = require('../middleware/auth');
var weixin = require("../control/weixin");

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
/* weixin related END */

router.get('/create_admin', function(req, res, next) {

    (async() => {
        var user = await userM.getUserByName(config.admin);

        if (user) {
            userM.deleteUser(user);
        }
        
        var md5 = crypto.createHash('md5');
        var pass = md5.update(config.admin_passwd).digest('base64');
        var admin = {
            login_name: config.admin,
            passwd: pass,
            phone_num: config.phone_num,
            role: 'system'
        };

        userM.newAndSave(admin);
    
        res.redirect('/');
    }) ()
});

module.exports = router;
