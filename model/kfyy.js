var Sequelize = require('sequelize');
var sequelize = require('../lib/mysql');

var Kfyy = sequelize.define('kfyy', {

    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},

    name: {type: Sequelize.STRING, defaultValue: ""},
    
    city: {type: Sequelize.STRING(16), defaultValue: ""},
    district: {type: Sequelize.STRING(16), defaultValue: ""},

    addr: {type: Sequelize.STRING, defaultValue: ""},
    url: {type: Sequelize.STRING, defaultValue: ""},

    level: {type: Sequelize.ENUM, values: ['1级', '2级', '3级'], defaultValue: '1级'},
    chuangwei: {type: Sequelize.INTEGER, defaultValue: 0},

    phone: {type: Sequelize.CHAR(11)},
    contact: {type: Sequelize.CHAR(16)},
    email: {type: Sequelize.CHAR(64)},
}, {
    freezeTableName: true
});

var kfyy = Kfyy.sync({force: false});

Kfyy.newAndSave = function(kfyy) {
    return Kfyy.create({
        name: kfyy.name,
        city: kfyy.city,
        district: kfyy.district,
        addr: kfyy.addr,
        url: kfyy.url,
        level: kfyy.level,
        chuangwei: kfyy.chuangwei,
        phone: kfyy.phone,
        contact: kfyy.contact,
        email: kfyy.email
    });
};

Kfyy.delete = function(kfyy) {
    kfyy.destroy();
};

Kfyy.update = function(currObj, newObj) {
    currObj.name = newObj.name;
    currObj.city = newObj.city;
    currObj.district = newObj.district;
    currObj.addr = newObj.addr;
    currObj.url = newObj.url;
    currObj.level = newObj.level;
    currObj.chuangwei = newObj.chuangwei;
    currObj.phone = newObj.phone;
    currObj.contact = newObj.contact;
    currObj.email = newObj.email;

    currObj.save();
};

Kfyy.queryByName = function(name) {
    var str = '%';
    var qstr = str.concat(name,'%');

    return Kfyy.findAll({
        where: {
            name: {'$like': qstr}
        }
    });
};

Kfyy.queryAll = function() {
    return Kfyy.findAll();
};

Kfyy.query = function(qfilter) {
    var filter = {
        where: qfilter
    };
    return Kfyy.findAll(filter);
};

Kfyy.getEntryById = function(id) {
    return Kfyy.findOne({where: {id: id}});
};

module.exports = Kfyy;
