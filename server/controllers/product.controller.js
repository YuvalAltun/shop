const createError = require('http-errors');
const _ = require('lodash');
var formidable = require('formidable');
var fs = require('fs');

exports.getProducts = async (req, res, next) => {
    try {
        const { name, category } = req.query;
        let sql = `SELECT p.id, p.name, p.price, p.image, p.categories_id, c.name as categoryName FROM products p inner join categories c on p.categories_id=c.id`;
        if (name && category)
            sql += ` WHERE p.name LIKE '%${name}%' AND p.categories_id = ${category}`;
        else if (!name && category)
            sql += ` WHERE p.categories_id = ${category}`;
        else if (name && !category)
            sql += ` WHERE p.name LIKE '%${name}%'`;
        const result = await db.query(sql);
        return res.status(200).json(result);
    } catch (error) {
        return next(createError(400, error.message));
    }
};

exports.getProductsByName = async (req, res, next) => {
    try {
        const name = req.query.name;
        const sql = `SELECT p.id, p.name, p.price, p.image, p.categories_id, c.name as categoryName FROM products p inner join categories c on p.categories_id=c.id WHERE name LIKE '%${name}%'`;
        const result = await db.query(sql);
        return res.status(200).json(result);
    } catch (error) {
        return next(createError(400, error.message));
    }
};

exports.getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.query;
        const sql = `SELECT p.id, p.name, p.price, p.image, p.categories_id, c.name as categoryName FROM products p inner join categories c on p.categories_id=c.id WHERE id = ${id}`;
        const result = await db.query(sql);
        return res.status(200).json(result);
    } catch (error) {
        return next(createError(400, error.message));
    }
};
exports.addProduct = async (req, res, next) => {
    try {
        const { name, price, image, categories_id } = req.body;
        if (!(name && price && image && categories_id))
            return next(createError(400, 'bad input missing product property'));

        const sql = `INSERT INTO products (name, price, image, categories_id) VALUES ('${name}', ${price}, '${image}', ${categories_id})`;
        const result = await db.query(sql);
        const sqlResult = `SELECT * FROM products WHERE id = ${result.insertId}`;
        const result1 = await db.query(sqlResult);
        if (_.get(result1, '[0]'))
            return res.status(201).json(JSON.parse(JSON.stringify(result1[0])));
        return next(createError(400, 'failed to create product'));
    } catch (error) {
        return next(createError(400, error.message));
    }
};

exports.editProduct = async (req, res, next) => {
    try {
        const { id, name, price, image, categories_id } = req.body;
        if (!(id && name && price && image && categories_id))
            return next(createError(400, 'bad input missing product property'));
        const sql = `UPDATE products set name = '${name}', price = ${price}, image = '${image}', categories_id = ${categories_id} WHERE id = ${id}`;
        const result = await db.query(sql);
        const sqlResult = `SELECT * FROM products WHERE id = ${id}`;
        const result1 = await db.query(sqlResult);
        if (_.get(result1, '[0]'))
            return res.status(201).json(JSON.parse(JSON.stringify(result1[0])));
        return next(createError(400, 'failed to edit product'));
        return res.status(200).json({ message: 'Product updated successfuly' });
    } catch (error) {
        return next(createError(400, error.message));
    }
};

exports.uploadPicture = async (req, res, next) => {
    const form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        const oldpath = files.filetoupload.path;
        var id = crypto.randomBytes(20).toString('hex');
        const newpath = path.join(__dirname, `upload/images${id}`);
        fs.rename(oldpath, newpath, function (err) {
            if (err) throw err;
            return res.status(200).json(newpath);

        });
    })
}
