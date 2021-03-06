const router = require('express')();
const productController = require('../controllers/product.controller');
const authMiddlware = require('./../middlewares/jwt.middelware');
const isAdminMiddlware = require('./../middlewares/isAdmin.middelware');
const multer = require('multer');
const upload = multer({dest:'uploads/'})




router.get('/getProducts',authMiddlware.checkUserAuthentication, productController.getProducts);

router.get('/getProductsByName', authMiddlware.checkUserAuthentication, productController.getProductsByName);


router.post('/addProduct', authMiddlware.checkUserAuthentication, isAdminMiddlware.isAdmin, productController.addProduct);

router.post('/modifyProduct', authMiddlware.checkUserAuthentication, isAdminMiddlware.isAdmin, productController.editProduct);

router.post('/uploadPicture', authMiddlware.checkUserAuthentication, isAdminMiddlware.isAdmin, upload.single('image'), productController.uploadPicture);

module.exports = router;
