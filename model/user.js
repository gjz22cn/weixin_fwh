var Sequelize = require('sequelize');
var sequelize = require('../lib/mysql');

var User = sequelize.define('user', {

    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},

    wx_name: {type: Sequelize.STRING, defaultValue: ""},

    openId: {type: Sequelize.STRING, defaultValue: ""},
    unionId: {type: Sequelize.STRING, defaultValue: ""},
    appId: {type: Sequelize.STRING, defaultValue: ""},

    login_name: {type: Sequelize.STRING(64), defaultValue: ""},
    passwd: {type: Sequelize.STRING, defaultValue: ""},
    gender: {type: Sequelize.ENUM, values: ['male', 'female']},

    country: {type: Sequelize.STRING(32)},
    province: {type: Sequelize.STRING(32)},
    city: {type: Sequelize.STRING(32)},

    phone_num: {type: Sequelize.CHAR(11)},
    email: {type: Sequelize.STRING, defaultValue: ""},

    score: {type: Sequelize.INTEGER, defaultValue: 0},

    is_active: {type: Sequelize.BOOLEAN, defaultValue: false},

    role: {type: Sequelize.ENUM, values: ['system', 'kfyy', 'spo', 'spp', 'user'], defaultValue: 'user'},

    addr1: {type: Sequelize.STRING, defaultValue: ""},
    addr2: {type: Sequelize.STRING, defaultValue: ""},
    addr3: {type: Sequelize.STRING, defaultValue: ""},
    addr4: {type: Sequelize.STRING, defaultValue: ""},
    addr5: {type: Sequelize.STRING, defaultValue: ""},
}, {
    freezeTableName: true
});

var user = User.sync({force: false});


User.getUsersByQuery = function(query) {
    return User.findAll({
        where: query
    });
};

User.newAndSave = function(user) {
    return User.create({
        login_name: user.login_name,
        passwd: user.passwd,
        phone_num: user.phone_num,
        is_active: user.is_active,
        role: user.role,
        email: user.email,

        wx_name: user.wx_name,
        openId: user.openId,
        gender: user.gender,
        country: user.country,
        province: user.province,
        city: user.city,
    });
};

User.getUserByPhone = function(phone_num) {
    return User.findOne({
        where: {phone_num: phone_num}
    });
};

User.getUserByName = function(name) {
    return User.findOne({
        where: {login_name: name}
    });
};

User.getUserById = function(id) {
    return User.findOne({
        where: {id: id}
    });
};

User.setUserActive = function(user) {
    user.is_active = true;
    user.save();
};

User.updateUser = function(user, newUser) {
    user.login_name = newUser.login_name;
    user.gender = newUser.gender;
    user.save();
};

User.deleteUser = function(user) {
    user.destroy();
};

User.query = function(qfilter) {
    var filter = {
        where: qfilter
    };
    return User.findAll(filter);
};

User.getCount = function(filter) {
    return User.count({
        where: filter
    });
};

module.exports = User;
