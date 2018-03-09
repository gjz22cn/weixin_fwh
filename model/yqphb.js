var Sequelize = require('sequelize');
var sequelize = require('../lib/mysql');
var User = require('./user');

var Yqphb = sequelize.define('yqphb', {

    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},

    name: {type: Sequelize.STRING(255), defaultValue: ""},
    city: {type: Sequelize.STRING(16), defaultValue: ""},
    district: {type: Sequelize.STRING(16), defaultValue: ""},
    addr: {type: Sequelize.STRING(255), defaultValue: ""},
    url: {type: Sequelize.STRING(255), defaultValue: ""},
    phone: {type: Sequelize.CHAR(11)},
    contacts: {type: Sequelize.STRING(16), defaultValue: ""},
    email: {type: Sequelize.STRING(64), defaultValue: ""},
}, {
    freezeTableName: true
});

Yqphb.belongsTo(User, {foreignKey: 'uid', onDelete: 'SET NULL', constraints: false});

var yqphb = Yqphb.sync({force: false});


Yqphb.newAndSave = function(obj) {
    return Yqphb.create({
        name: obj.name,
        city: obj.city,
        district: obj.district,
        addr: obj.addr,
        url: obj.url,
        phone: obj.phone,
        contacts: obj.contacts,
        email: obj.email,
        uid: obj.uid,
    });
};

Yqphb.getEntryById = function(id) {
    return Yqphb.findOne({
        where: {id: id}
    });
};


Yqphb.update = function(currObj, newObj) {
    currObj.name = newObj.name;
    currObj.city = newObj.city,
    currObj.district = newObj.district,
    currObj.addr = newObj.addr,
    currObj.url = newObj.url,
    currObj.phone = newObj.phone,
    currObj.contacts = newObj.contacts,
    currObj.email = newObj.email,
    currObj.uid = newObj.uid;

    currObj.save();
};

Yqphb.delete = function(obj) {
    obj.destroy();
};

Yqphb.query = function(qfilter) {
    var filter = {
        where: qfilter
    };
    return Yqphb.findAll(filter);
};

Yqphb.getCount = function(filter) {
    return Yqphb.count({
        where: filter
    });
};

module.exports = Yqphb;
