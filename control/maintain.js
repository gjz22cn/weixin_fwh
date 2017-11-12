var userM = require('../model/user');
var config = require('../config');
var crypto = require('crypto');

exports.create_admin = function(req, res, next) {
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
}
