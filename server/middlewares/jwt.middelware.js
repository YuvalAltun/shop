const jwt = require('jsonwebtoken');
const config = require('../config');
exports.checkUserAuthentication = async (req, res, next) => {
    //next(); // TODO: remove this line and uncomment lines below when going to prod

    try {
        const token = req.headers.authorization.split(" ")[1];
        const JWT_KEY = config.JWT_SEC;
        req.userData = jwt.verify(token, JWT_KEY);
        next();
    } catch (error) {
        next({status: 401, message: 'Authentication failed'});

    }
};