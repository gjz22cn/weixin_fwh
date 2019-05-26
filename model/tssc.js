var Sequelize = require('sequelize');
var sequelize = require('../lib/mysql');
var TsscDetail = require('./tssc_detail');

var Tssc = sequelize.define('tssc', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, unique: true},
    name: {type: Sequelize.STRING, defaultValue: ""},
    author: {type: Sequelize.STRING, defaultValue: ""},
    state: {type: Sequelize.ENUM, values: ['0', '1', '2'], defaultValue: '0'},
    first_time:  {type: Sequelize.DATE},
    beisong_time:  {type: Sequelize.DATE},
    retry_cnt: {type: Sequelize.INTEGER, defaultValue: 0},
}, {
    freezeTableName: true
});

Tssc.belongsTo(TsscDetail, {foreignKey: 'tssc_detail_id',  onDelete: 'SET NULL', constraints: false});

var tssc = Tssc.sync({force: false});

Tssc.newAndSave = function(newObj) {
    return Tssc.create({
        name: newObj.name,
        author: newObj.author,
	tssc_detail_id: null,
	state: '0',
	first_time: Date.now()
    });
};

Tssc.delete = function(currObj) {
    currObj.destroy();
};

Tssc.update = function(currObj, newObj) {
    currObj.name = newObj.name;
    currObj.author = newObj.author;
    currObj.state = newObj.state;
    currObj.beisong_time = newObj.beisong_time;
    currObj.retry_cnt = newObj.retry_cnt;

    currObj.save();
};

Tssc.queryByName = function(name) {
    var str = '%';
    var qstr = str.concat(name,'%');

    return Tssc.findAll({
        where: {
            name: {'$like': qstr}
        }
    });
};

Tssc.queryAll = function() {
    return Tssc.findAll();
};

Tssc.query = function(qfilter) {
    var filter = {
        where: qfilter
    };
    return Tssc.findAll(filter);
};

Tssc.getEntryById = function(id) {
    return Tssc.findOne({where: {id: id}});
};

module.exports = Tssc;
