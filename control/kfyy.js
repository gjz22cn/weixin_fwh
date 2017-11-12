
var Kfyy = require('../model/kfyy');
var KfyyOrder = require('../model/kfyyOrder');
var eventproxy = require('eventproxy');
var User = require('../model/user');
var validator = require('validator');
const moment = require('moment');


exports.add = function(req, res, next) {
    var name = req.body.name;
    var city = req.body.city;
    var district = req.body.district;
    var addr = req.body.addr;
    var url = req.body.url;
    var level = req.body.level;
    var chuangwei = req.body.chuangwei;
    var phone = req.body.phone;
    var contact = req.body.contact;
    var email = req.body.email;


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
            city: city,
            district: district,
            addr: addr,
            url: url,
            level: level,
            chuangwei: chuangwei,
            phone: phone,
            contact: contact,
            email: email
        };

        var obj = await Kfyy.newAndSave(newObj);
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
            objs = await Kfyy.queryByName(filter.name);
        }
        else {
            objs = await Kfyy.query(filter);
        }

        if (objs.length > 0) {
            for (var i =0; i < objs.length; i++) {
                var info = {
                    id: objs[i].id,
                    name: objs[i].name,
                    city: objs[i].city,
                    district: objs[i].district,
                    addr: objs[i].addr,
                    url: objs[i].url,
                    level: objs[i].level,
                    chuangwei: objs[i].chuangwei,
                    phone: objs[i].phone,
                    contact: objs[i].contact,
                    email: objs[i].email
                    //createdAt: moment(objs[i].createdAt).format('YYYY-MM-DD HH:mm')
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

        obj = await Kfyy.getEntryById(id);

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
    var phone = req.body.phone;
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
        var obj = await Kfyy.getEntryById(id);
        if (!obj) {
            ep.emit('err', '设备厂商id错误');
            return;
        }
        
        var newObj = {
            name: req.body.name, 
            city: req.body.city, 
            district: req.body.district, 
            addr: req.body.addr, 
            url: req.body.url, 
            level: req.body.level, 
            chuangwei: req.body.chuangwei, 
            phone: req.body.phone, 
            contact: req.body.contact, 
            email: req.body.email
        };

        Kfyy.update(obj, newObj);

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
        var obj = await Kfyy.getEntryById(id);
        if (!obj) {
            ep.emit('err', '设备厂商不存在');
            return;
        }

        Kfyy.delete(obj);

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

        objs = await Kfyy.query({});

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

// path: /kfyy/order
exports.order = function(req, res, next) {
    var name = req.body.name;
    var gender = req.body.gender;
    var age = req.body.age;
    var idCard = req.body.idCard;
    var dateS = req.body.dateS;
    var dateE = req.body.dateE;
    var comment = req.body.comment;
    var phone = req.body.phone;
    var kfyyId = req.body.kfyyId;
    var uid = req.session.user.id;
    var ep = new eventproxy();

    ep.fail(next);
    ep.on('err', function(msg) {
        var retStr = {
            ret: msg.ret,
            msg: msg,str
        };

        res.send(JSON.stringify(retStr));
    });

    if ([kfyyId, uid, phone].some(function(item) {return item === '';})) {
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
            gender: gender, 
            age: age, 
            idCard: idCard, 
            dateS: dateS, 
            dateE: dateE, 
            comment: comment, 
            phone: phone, 
            kfyyId: kfyyId, 
            uid: uid, 
        };

        var obj = await KfyyOrder.newAndSave(newObj);
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
}

/*
exports.updateParknum = function(pid, num, add) {

    (async() => {
        var pps = await Pps.getPpsById(pid);
        if (!pps) {
            return;
        }

        var parkNum = pps.parkNum;

        if (add) {
            parkNum += num;
        }
        else {
            parkNum -= num;
        }

        var newPps = {
            parkNum: parkNum
        };

        await Pps.updatePps(pps, newPps);
    }) ()
};*/
