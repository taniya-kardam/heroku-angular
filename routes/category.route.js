const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');
const {body}= require('express-validator');
const multer = require('multer');
var storage = multer.diskStorage(
    {
        destination: 'public/images',
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        }
    }
);

var upload = multer({ storage: storage });
router.post("/add",upload.single('categoryImageUrl'),
// body('categoryName').not().isEmpty(),
categoryController.categoryadd);

router.get("/category-list",categoryController.showlist);

router.delete("/delete/:id",categoryController.delete);

router.post("/update/:id",upload.single('categoryImageUrl'),
body('categoryName').not().isEmpty(),categoryController.update)

module.exports = router;