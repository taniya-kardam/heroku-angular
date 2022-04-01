const express = require('express');
const { validationResult } = require('express-validator');
const Admin = require('../models/admin.model');

exports.signup = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(403).json({ errors: errors.array() })
    }
    let userEmail = request.body.email;
    let userPassword = request.body.password;
    Admin.create({ email: userEmail, password: userPassword })
        .then(result => {
            console.log(result);
            return response.status(201).json(result);
        }).catch(err => {
            return response.status(500).json({ message: 'Oops! something went wrong' })
        });


}

exports.signin = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty())
        return response.status(403).json({ errors: errors.array() });
    Admin.findOne({ email: request.body.email, password: request.body.password })
        .then(result => {
            if (result)
                return response.status(200).json(result);
            else
                return response.status(404).json({ message: 'Invalid user' })
        }).catch(err => {
            return response.status(500).json({ message: 'Oops something went wrong' });
        })
}