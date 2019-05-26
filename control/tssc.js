var Tssc = require('../model/tssc');
var eventproxy = require('eventproxy');
var User = require('../model/user');
var validator = require('validator');
const moment = require('moment');


exports.add = function(req, res, next) {
    var name = req.body.name;
    var author = req.body.aythor;
    var state = req.body.state;


    var ep = new eventproxy();
    ep.fail(next);
    ep.on('err', function(msg) {
        var retStr = {
            ret: 1,
            msg: msg
        };

        res.send(JSON.stringify(retStr));
    });

    if ([name, phone].some(function(item) {return item === '';})) {
        ep.emit('err', '信息不完整');
        return;
    }

    if (!validator.isNumeric(phone) || !validator.isLength(phone, 11)) {
        ep.emit('prop_err', '手机号码不合法');
        return;
    }

    (async() => {
        var newObj = {
            name: name,
            author: author,
            state: state,
        };

        var obj = await Tssc.newAndSave(newObj);
        if (!obj) {
            ep.emit('err', '数据库错误');
            return;
        }

        var retStr = {
            ret: 0,
            id: obj.id
        };

        res.send(JSON.stringify(retStr));

    }) ()
   
};

exports.get = function(req, res, next) {
    var list = [];
    var filter = JSON.parse(req.query.filter);    
    var ep = new eventproxy();

    ep.fail(next);
    ep.on('err', function(msg) {
        var retStr = {
            ret: 1,
            msg: msg
        };

        res.send(JSON.stringify(retStr));
    });

    (async () => {
        var objs;

        if (typeof(filter.name) != 'undefined') {
            objs = await Tssc.queryByName(filter.name);
        }
        else {
            objs = await Tssc.query(filter);
        }

        if (objs.length > 0) {
            for (var i =0; i < objs.length; i++) {
                var info = {
                    id: objs[i].id,
                    name: objs[i].name,
                    author: objs[i].author,
                    state: objs[i].state,
                };

                list.push(info);
            }
        }

        var retStr = {
            ret: 0,
            data: list
        };

        res.send(JSON.stringify(retStr));
    }) ()

};

exports.getone = function(req, res, next) {
    var id = req.params.id;
    var ep = new eventproxy();

    ep.fail(next);
    ep.on('err', function(msg) {
        var retStr = {
            ret: 1,
            msg: msg
        };

        res.send(JSON.stringify(retStr));
    });

    (async () => {
        var obj;

        obj = await Tssc.getEntryById(id);

        /*TODO: add err handling here for no data found */
        
        var retStr = {
            ret: 0,
            data: obj
        };

        res.send(JSON.stringify(retStr));
    }) ()
};

exports.update = function(req, res, next) {
    var id = req.params.id;
    var state = req.body.state;
    var uid;

    var ep = new eventproxy();
    ep.fail(next);
    ep.on('err', function(msg) {
        var retStr = {
            ret: 1,
            msg: msg
        };

        res.send(JSON.stringify(retStr));
    });

    (async() => {
        var obj = await Tssc.getEntryById(id);
        if (!obj) {
            ep.emit('err', '设备厂商id错误');
            return;
        }
        
        var newObj = {
            name: req.body.name, 
            author: req.body.author, 
            state: req.body.state, 
        };

        Tssc.update(obj, newObj);

        var retStr = {
            ret: 0
        };

        res.send(JSON.stringify(retStr));
    }) ()
   
};

exports.delete = function(req, res, next) {
    var id = req.params.id;

    var ep = new eventproxy();
    ep.fail(next);
    ep.on('err', function(msg) {
        var retStr = {
            ret: 1,
            msg: msg
        };

        res.send(JSON.stringify(retStr));
    });


    (async() => {
        var obj = await Tssc.getEntryById(id);
        if (!obj) {
            ep.emit('err', '设备厂商不存在');
            return;
        }

        Tssc.delete(obj);

        var retStr = {
            ret: 0
        };

        res.send(JSON.stringify(retStr));
    }) ()
};

// path: /kfyy/namelist
exports.getNameList = function(req, res, next) {
    var list = [];
    var ep = new eventproxy();

    ep.fail(next);
    ep.on('err', function(msg) {
        var retStr = {
            ret: msg.ret,
            msg: msg,str
        };

        res.send(JSON.stringify(retStr));
    });

    if(req.session.user.role != 'system') {
        ep.on('err', {ret: 8003, str: "无权限!"});
        return;
    }

    (async() => {
        var objs;

        objs = await Tssc.query({});

        if (objs.length > 0) {
            for (var i =0; i < objs.length; i++) {
                list.push({ 
                    id:objs[i].id,
                    name:objs[i].name
                });
            }
        }

        var retStr = {
            ret: 0,
            data: list
        };

        res.send(JSON.stringify(retStr));
    }) ()
}
