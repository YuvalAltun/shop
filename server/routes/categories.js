const router = require('express')();
const categoryController = require('../controllers/category.controller');
const authMiddlware = require('./../middlewares/jwt.middelware');
const isAdminMiddlware = require('./../middlewares/isAdmin.middelware');




router.get('/getCategories',authMiddlware.checkUserAuthentication, categoryController.getCategories);

router.post('/addCategory', authMiddlware.checkUserAuthentication, isAdminMiddlware.isAdmin, categoryController.addCategory);

module.exports = router;
