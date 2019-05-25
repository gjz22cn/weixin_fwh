/**
 * config
 */

var config = {
    host: 'localhost',
    database: 'digprodb',
    db_username: 'digpro',
    db_passwd: '123456',

    redis_host: '127.0.0.1',
    redis_port: 6379,
    redis_db: 0,
    redis_passwd: '',

    session_secret: 'digpro_secret',
    auth_cookie_name: 'digpro',

    admin: 'admin',
    admin_passwd: 'admin',
    phone_num: '18616996720'
};

module.exports = config;
