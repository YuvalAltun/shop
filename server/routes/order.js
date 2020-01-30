const router = require('express')();
const orderController = require('../controllers/order.controller');
const authMiddlware = require('./../middlewares/jwt.middelware');




router.get('/getOrders',authMiddlware.checkUserAuthentication, orderController.getOrders);


router.get('/getOrderById',authMiddlware.checkUserAuthentication, orderController.getOrderById);


router.post('/addOrder', authMiddlware.checkUserAuthentication, orderController.addOrder);

module.exports = router;
