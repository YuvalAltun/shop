const createError = require('http-errors');
const _ = require('lodash');


// async function getActiveCartByUserId(userId) {
//     try{

//     } catch (error) {
//         return null;
//     }
// }
exports.getActiveCart = async (req, res, next) => {
    try{
        const userId = req.userData.id;
        let sql = `SELECT * FROM carts WHERE users_id = ${userId} AND status = 'open'`;
        const carts = await db.query(sql);
        if( carts.length === 0 )
            return next(createError(400, 'you dont have an open cart'));
        // const cartId = _.get(carts, '[0].id');
        const cart = _.get(carts, '[0]');
        sql = `SELECT i.id, i.amount, i.price, i.carts_id, p.name AS productName FROM items i INNER JOIN products p ON i.products_id = p.id WHERE carts_id = ${cart.id}`;
        const items = await db.query(sql);
        cart.items = items;
        return res.status(200).json(cart);
    } catch(error) {
        return next(createError(400, error.message));
    }
};


exports.openCart = async (req, res, next) => {
    try{
        const userId = req.userData.id;
        let sql = `SELECT * FROM carts WHERE users_id = ${userId} AND status = 'open'`;
        const carts = await db.query(sql);
        if( carts.length !== 0 )
            return next(createError(400, 'you already have an open cart'));
        sql = `INSERT INTO carts ( creationDate, status, users_id) VALUES ('${new Date().toISOString().split('T')[0]}', 'open', ${userId})`;
        const inserResult = await db.query(sql);
        sql = `SELECT * FROM carts WHERE id = ${inserResult.insertId}`;
        const activeCart = await db.query(sql);
        const cart = _.get(activeCart, '[0]')
        if(cart) {
            cart.items = [];
            return res.status(201).json(cart);
        }
        return next(createError(400, 'failed to create cart'));
    } catch(error) {
        return next(createError(400, error.message));
    }
};


exports.addItem = async (req, res, next) => {
    try{
        const {amount, price, products_id} = req.body;
        if(!(amount && price  &&  products_id))
            return next(createError(400, 'bad input missing Item property'));

        const userId = req.userData.id;
        let sql = `SELECT * FROM carts WHERE users_id = ${userId} AND status = 'open'`;
        const carts = await db.query(sql);
        if( carts.length === 0 )
            return next(createError(400, 'you dont have an open cart'));
        const cartId = _.get(carts, '[0].id');

        sql = `INSERT INTO items (amount, price, carts_id, products_id) VALUES ('${amount}', ${price}, '${cartId}', ${products_id})`;
        const inserItem = await db.query(sql);
        sql = `SELECT i.id, i.amount, i.price, i.carts_id, p.name AS productName FROM items i INNER JOIN products p ON i.products_id = p.id WHERE i.id = ${inserItem.insertId}`
        const items = await db.query(sql);
        return res.status(201).json(_.get(items, '[0]'));
    } catch(error) {
        return next(createError(400, error.message));
    }
};

exports.editItem = async (req, res, next) => {
    try{
        const {id, amount} = req.body;
        if(!(amount && id))
            return next(createError(400, 'bad input missing Item property'));

        const userId = req.userData.id;
        let sql = `SELECT * FROM carts WHERE users_id = ${userId} AND status = 'open'`;
        const carts = await db.query(sql);
        if( carts.length === 0 )
            return next(createError(400, 'you dont have an open cart'));
        const cartId = _.get(carts, '[0].id');

        sql = `UPDATE items SET amount = ${amount} WHERE id = ${id} AND carts_id = ${cartId}`;
        await db.query(sql);
        return res.status(200);
    } catch(error) {
        return next(createError(400, error.message));
    }
};

exports.deleteItem = async (req, res, next) => {
    try{
        const {id} = req.body;
        if(!( id))
            return next(createError(400, 'bad input missing Item property'));

        const userId = req.userData.id;
        let sql = `SELECT * FROM carts WHERE users_id = ${userId} AND status = 'open'`;
        const carts = await db.query(sql);
        if( carts.length === 0 )
            return next(createError(400, 'you dont have an open cart'));
        const cartId = _.get(carts, '[0].id');

        sql = `DELETE FROM items WHERE id = ${id} AND carts_id = ${cartId}`;
        await db.query(sql);
        return res.status(200).json(id);
    } catch(error) {
        return next(createError(400, error.message));
    }
};

exports.deleteAllItems = async (req, res, next) => {
    try{
        const userId = req.userData.id;
        let sql = `SELECT * FROM carts WHERE users_id = ${userId} AND status = 'open'`;
        const carts = await db.query(sql);
        if( carts.length === 0 )
            return next(createError(400, 'you dont have an open cart'));
        const cartId = _.get(carts, '[0].id');

        sql = `DELETE FROM items WHERE  carts_id = ${cartId}`;
        await db.query(sql);
        return res.status(200);
    } catch(error) {
        return next(createError(400, error.message));
    }
};

exports.getActiveCartItems = async (req, res, next) => {
    try{
        const userId = req.userData.id;
        let sql = `SELECT * FROM carts WHERE users_id = ${userId} AND status = 'open'`;
        const carts = await db.query(sql);
        if( carts.length === 0 )
            return next(createError(400, 'you dont have an open cart'));
        const cartId = _.get(carts, '[0].id');

        sql = `SELECT * FROM items WHERE carts_id = ${cartId}`;
        const items = await db.query(sql);
        return res.status(200).json(items);
    } catch(error) {
        return next(createError(400, error.message));
    }
};



exports.close