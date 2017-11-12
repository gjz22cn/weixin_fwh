
var UserRole = {
    ur_unlogin: "none",
    ur_user: "user",
    ur_shequ: "shequ",
    ur_kfyy: "kfyy",
    ur_system: "system"
};

UserRole.getUserRole = function (role) {
    
    /* TODO: get user role from session info */
    var userRole;

    switch(role) {
        case 'super':
            userRole = UserRole.ur_system;
            break;
        case 'kfyy':
            userRole = UserRole.ur_kfyy;
            break;
        case 'shequ':
            userRole = UserRole.ur_shequ;
            break;
        case 'normal':
            userRole = UserRole.ur_user;
            break;
        default:
            userRole = UserRole.ur_unlogin;
    }

    return userRole;
};

module.exports = UserRole;

