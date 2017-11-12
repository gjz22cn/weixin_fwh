var Sequelize = require('sequelize');
var sequelize = require('../lib/mysql');
var User = require('./user');
var Kfyy = require('./kfyy');

var KfyyOrder = sequelize.define('kfyyOrder', {

    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},

    name: {type: Sequelize.STRING(16), defaultValue: ""},
    gender: {type: Sequelize.ENUM, values: ['male', 'female']},
    age: {type: Sequelize.INTEGER, defaultValue: 0},
    idCard: {type: Sequelize.STRING(20), defaultValue: ""},

    dateS: {type: Sequelize.DATE},
    dateE: {type: Sequelize.DATE},
    comment: {type: Sequelize.STRING, defaultValue: ""},
    phone: {type: Sequelize.CHAR(11)},
    status: {type: Sequelize.ENUM, values: ['未处理','拒绝','接收']},
}, {
    freezeTableName: true
});

KfyyOrder .belongsTo(User, {foreignKey: 'uid', onDelete: 'SET NULL', constraints: false});
KfyyOrder.belongsTo(Kfyy, {foreignKey: 'kfyyId', onDelete: 'SET NULL', constraints: false});

var kfyyOrder = KfyyOrder.sync({force: false});


KfyyOrder.newAndSave = function(obj) {
    return KfyyOrder.create({
        name: obj.name,
        gender: obj.gender,
        age: obj.age,
        idCard: obj.idCard,
        dateS: obj.dateS,
        dateE: obj.dateE,
        comment: obj.comment,
        phone: obj.phone,
        uid: obj.uid,
        kfyyId: obj.kfyyId
    });
};

KfyyOrder.getEntryById = function(id) {
    return KfyyOrder.findOne({
        where: {id: id}
    });
};


KfyyOrder.update = function(currObj, newObj) {
    currObj.name = newObj.name;
    currObj.gender = newObj.gender;
    currObj.age = newObj.age;
    currObj.idCard = newObj.idCard;
    currObj.dateS = newObj.dateS;
    currObj.dateE = newObj.dateE;
    currObj.comment = newObj.comment;
    currObj.phone = newObj.phone;
    currObj.uid = newObj.uid;
    currObj.kfyyId = newObj.kfyyId

    currObj.save();
};

KfyyOrder.delete = function(obj) {
    obj.destroy();
};

KfyyOrder.query = function(qfilter) {
    var filter = {
        where: qfilter
    };
    return KfyyOrder.findAll(filter);
};

KfyyOrder.getCount = function(filter) {
    return KfyyOrder.count({
        where: filter
    });
};

module.exports = KfyyOrder;
