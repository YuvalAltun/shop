const jwt = require('jsonwebtoken');
const config = require('../config');
exports.isAdmin = async (req, res, next) => {
    //next(); // TODO: remove this line and uncomment lines below when going to prod

    try {
        const user = req.userData;
        if(user.type === 'admin')
            next();
        else {
            next({status: 401, message: 'Authentication failed'});
        }
    } catch (error) {
        next({status: 401, message: 'Authentication failed'});

    }
};