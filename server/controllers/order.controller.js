const createError = require('http-errors');
const _ = require('lodash');

// TODO: implement this controller
// getAllMyOrders
// placeAnOrder


exports.getOrders = async (req, res, next) => {
    try{
        const sql = `SELECT Count(*) AS count, deliveryDate FROM orders group by deliveryDate;`;
        const orders = await db.query(sql);
        return res.status(200).json(orders);
    } catch(error) {
        return next(createError(400, error.message));
    }
};

exports.getOrderById = async (req, res, next) => {
    try{
        const {id} = req.query;
        const sql = `SELECT *  FROM orders WHERE id = ${id};`;
        const orders = await db.query(sql);
        return res.status(200).json(orders[0]);
    } catch(error) {
        return next(createError(400, error.message));
    }
};

exports.addOrder = async (req, res, next) => {
    try{
        const {deliveryDate, city, street, creditCard} = req.body;
        if (!(deliveryDate && city && street && creditCard) ) 
            return next(createError(400, 'one of the params not exist'));
        const userId = req.userData.id;
        let sql = `SELECT * FROM carts WHERE users_id = ${userId} AND status = 'open'`;
        const carts = await db.query(sql);
        if( carts.length === 0 )
            return next(createError(400, 'you dont have an open cart'));
        const cartId = _.get(carts, '[0].id');
        sql = `SELECT Count(*) AS count, deliveryDate FROM orders WHERE deliveryDate = '${deliveryDate}'  group by deliveryDate;`;
        const orders = await db.query(sql);
        if(orders.length && orders[0].count >= 3)
            return next(createError(400, 'The choosen date is too busy'));
        const priceResult = await db.query(`SELECT SUM(price * amount) AS price FROM items where carts_id = ${cartId}`);
        sql = `INSERT INTO orders (price, city, street, deliveryDate, date, creditCardNumber, users_id, carts_id)
         VALUES (${priceResult[0].price}, '${city}', '${street}', '${deliveryDate}', '${new Date().toISOString().split('T')[0]}', '${creditCard}', ${userId}, ${cartId})`;
         const insertedOrder = await db.query(sql);
        sql = `UPDATE carts set status = 'close' WHERE id = ${cartId}`
        await db.query(sql);
        return res.status(201).json(insertedOrder.insertId);
    } catch(error) {
        return next(createError(400, error.message));
    }
};