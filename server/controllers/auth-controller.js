const config = require('../config');

const _ = require('lodash');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const createError = require('http-errors');

exports.signup = async (req, res, next) => {
    try{
        const {name, sureName, email, password, city, street, id} = req.body;
        if(!(name && sureName && email && password && city && street && id))
            return next(createError(400, 'bad input missing sign up property'));

        const idResult =await db.query(`select 1 from users where id = '${id}'`);
        if( idResult.length)
            return next(createError(400, 'id already exists in the system'));
        const encrypted_pass = bcrypt.hashSync(req.body.password, 10);
        var sql = `INSERT INTO users(firstName, surname, email, password, city, street, id, type) VALUES ('${name}', '${sureName}', '${email}', '${encrypted_pass}', '${city}', '${street}', '${id}', 'user')`;
        const result = await db.query(sql);
        return res.status(201).json({message: 'user created successfuly'});
    } catch(error) {
        return next(createError(400, error.message));
    }
};

exports.login = async (req, res, next) => {
    try{
    const email = req.body.email;
    const password = req.body.password;
    db.query(`select * from users where email = '${email}'`, (err,users) => {
        if (err) 
            return next({status: 401, message: 'bad input'});
        const result = bcrypt.compareSync(password, users[0].password);
        if (!result) 
            return next({status: 401, message: 'wrong password'});
    
        const JWT_KEY = config.JWT_SEC;
        jwt.sign({ user: users[0].email, type: users[0].type, id: users[0].id, firtsName: users[0].firstName  }, JWT_KEY, (err , token) => {
            const user = users[0];
            delete user.password;
            user.token = token;
            return res.status(200).json({ success: true, user});    
        });

    })
} catch(err) {

}

};







