const express = require('express');
const router = express.Router();
const productController = require('../controller/product.controller');
const {body} = require('express-validator');
const multer = require('multer');
var storage = multer.diskStorage(
    {
        destination: 'public/images',
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        }
    }
);
router.get("/product-list",productController.showlist);


var upload = multer({ storage: storage });
router.post("/add",upload.single('productImageUrl')
,body('productName').not().isEmpty(),
body('productPrice').not().isEmpty(),
body('productQuantity').not().isEmpty(),
body('productDiscription').not().isEmpty()
,productController.addProduct);

router.delete("/delete/:id",productController.deleteproduct)
