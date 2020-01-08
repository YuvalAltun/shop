const router = require('express')();

router.post('/login', authController.login);

router.post('/signup', authController.signup);




module.exports = router;
