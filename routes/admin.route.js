const express = require('express');
const Admin = require('../models/admin.model');
const admincontroller = require('../controller/admin.controller');
const router = express.Router();
const { body, validationResult } = require('express-validator');


router.post("/signup",
    body('email').isEmail()
    // body('password', 'Password length must be 5 letters long').isLength(5),
    ,
    admincontroller.signup);

router.post("/signin",
    body('email').isEmail(),
    body('password', 'Password must be 5 letters long').isLength(5),
    admincontroller.signin);




module.exports = router;