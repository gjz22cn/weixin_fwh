var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var user = require('../control/user');
var userM = require('../model/user');
var config = require('../config');
var auth = require('../middleware/auth');
var weixin = require("../control/weixin");
var maintain = require("../control/maintain");

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


/* maintain related START */
router.get('/create_admin', function(req, res, next) {
    maintain.create_admin(req, res, next);
});
/* maintain related END */

module.exports = router;
