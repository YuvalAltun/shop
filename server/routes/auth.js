const router = require('express')();
const authController = require('../controllers/auth.controller');
const authMiddlware = require('./../middlewares/jwt.middelware');
const isAdminMiddlware = require('./../middlewares/isAdmin.middelware');

router.post('/login', authController.login);

router.post('/signup', authController.signup);

router.get('/isLogedIn',authMiddlware.checkUserAuthentication, authController.isLogedIn);

router.get('/isAdmin', authMiddlware.checkUserAuthentication, isAdminMiddlware.isAdmin, authController.isAdmin);




module.exports = router;
