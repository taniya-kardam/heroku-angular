const express = require('express');
const User = require('../models/user.model');
const usercontroller = require('../controller/user.controller');
const router = express.Router();
const { body, validationResult } = require('express-validator');


router.post("/signup",
    body('username'),
    body('mobile').isMobilePhone(),
    body('email').isEmail(),
    body('password', 'Password length must be 5 letters long').isLength(5),
    usercontroller.signup);

router.post("/signin",
    body('email').isEmail(),
    body('password', 'Password must be 5 letters long').isLength(5),
    usercontroller.signin);

router.get("/view-user", usercontroller.viewUser);

router.delete("/delete-account/:userId", usercontroller.deleteAccount);


module.exports = router;