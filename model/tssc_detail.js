var Sequelize = require('sequelize');
var sequelize = require('../lib/mysql');

var TsscDetail = sequelize.define('tssc_detail', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    name: {type: Sequelize.STRING, defaultValue: ""},
    author: {type: Sequelize.STRING, defaultValue: ""},
}, {
    freezeTableName: true
});

var tssc_detail = TsscDetail.sync({force: false});

TsscDetail.newAndSave = function(newObj) {
    return TsscDetail.create({
        name: newObj.name,
        author: newObj.author,
    });
};

TsscDetail.delete = function(currObj) {
    currObj.destroy();
};

TsscDetail.update = function(currObj, newObj) {
    currObj.name = newObj.name;
    currObj.author = newObj.author;

    currObj.save();
};

TsscDetail.queryByName = function(name) {
    var str = '%';
    var qstr = str.concat(name,'%');

    return TsscDetail.findAll({
        where: {
            name: {'$like': qstr}
        }
    });
};

TsscDetail.queryAll = function() {
    return TsscDetail.findAll();
};

TsscDetail.query = function(qfilter) {
    var filter = {
        where: qfilter
    };
    return TsscDetail.findAll(filter);
};

TsscDetail.getEntryById = function(id) {
    return TsscDetail.findOne({where: {id: id}});
};

module.exports = TsscDetail;
