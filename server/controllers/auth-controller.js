const config = require('../config');

const _ = require('lodash');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

exports.signup = async (req, res, next) => {
    try{
        const {firstName, sureName, email, password, city, street, identification} = req.body;
        if(!(firstName && sureName && email && password && city && street && identification))
            return next(createError(400, 'bad input missing sign up property'));

        const encrypted_pass = bcrypt.hashSync(req.body.password, 10);
        var sql = `INSERT INTO users(firstName, sureName, email, password, city, street, identification) VALUES ('${firstName}', '${sureName}', '${email}', '${encrypted_pass}', '${city}', '${street}', '${identification}')`;
        const result = db.query(sql);
        return res.status(201).json({message: 'user created successfuly'});
    } catch(error) {
        return next(createError(400, error.message));
    }
};

exports.login = async (req, res, next) => {
    const username = req.body.userName;
    const password = req.body.password;
    console.log(username, password);
    connection.query(`select * from users where username = '${username}'`, (err,users) => {
        if (err) 
            return next({status: 401, message: 'bad input'});
        const result = bcrypt.compareSync(password, users[0].password);
        if (!result) 
            return next({status: 401, message: 'wrong password'});
    
        const JWT_KEY = config.JWT_SEC;
        jwt.sign({ user: users[0].username, role: users[0].role, id: users[0].id  }, JWT_KEY, (err , token) => {
            const user = users[0];
            delete user.password;
            user.token = token;
            return res.status(200).json({ success: true, user});    
        });

    })

};







