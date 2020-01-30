const createError = require('http-errors');
const _ = require('lodash');

exports.getCategories = async (req, res, next) => {
    try {
        const sql = `SELECT * FROM categories`;
        const result = await db.query(sql);
        return res.status(200).json(result);
    } catch (error) {
        return next(createError(400, error.message));
    }
};

exports.getCategoryById = async (req, res, next) => {
    try {
        const { id } = req.query;
        const sql = `SELECT * FROM categories WHERE id = ${id}`;
        const result = await db.query(sql);
        return res.status(200).json(result);
    } catch (error) {
        return next(createError(400, error.message));
    }
};

exports.addCategory = async (req, res, next) => {
    try {
        const { name } = req.body;
        if (!name)
            return next(createError(400, 'bad input missing category property'));

        const sql = `INSERT INTO categories (name) VALUES ('${name}')`;
        const result = await db.query(sql);
        const sqlResult = `SELECT * FROM categories WHERE id = ${result.insertId}`;
        const result1 = await db.query(sqlResult);
        if (_.get(result1, '[0]'))
            return res.status(201).json(result1[0]);
        return next(createError(400, 'failed to create category'));
    } catch (error) {
        return next(createError(400, error.message));
    }
};

exports.editCategory = async (req, res, next) => {
    try {
        const { id, name } = req.body;
        if (!(id && name))
            return next(createError(400, 'bad input missing category property'));
        const sql = `UPDATE categories set name = '${name}' WHERE id = ${id}`;
        const result = await db.query(sql);
        return res.status(200).json({ message: 'category updated successfuly' });
    } catch (error) {
        return next(createError(400, error.message));
    }
};