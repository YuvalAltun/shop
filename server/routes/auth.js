const router = require('express')();
const authController = require('./../controllers/auth-controller');

router.post('/login', authController.login);

router.post('/signup', authController.signup);




module.exports = router;
