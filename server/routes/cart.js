const router = require('express')();
const cartController = require('../controllers/cart.controller');
const authMiddlware = require('./../middlewares/jwt.middelware');




router.get('/getActiveCart',authMiddlware.checkUserAuthentication, cartController.getActiveCart);

router.get('/getActiveCartItems',authMiddlware.checkUserAuthentication, cartController.getActiveCartItems);

router.post('/openCart',authMiddlware.checkUserAuthentication, cartController.openCart);

router.post('/addItem', authMiddlware.checkUserAuthentication, cartController.addItem);

router.post('/editItem', authMiddlware.checkUserAuthentication, cartController.editItem);

router.post('/deleteItem', authMiddlware.checkUserAuthentication, cartController.deleteItem);

router.post('/deleteAllItems', authMiddlware.checkUserAuthentication, cartController.deleteAllItems);

module.exports = router;


