const express = require('express');
const { validationResult } = require('express-validator');
const user = require('../models/user.model');

exports.signup = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty) {
        return response.status(403).json({ errors: errors.array() })
    }
    let userName = request.body.username;
    let contact = request.body.mobile;
    let userEmail = request.body.email;
    let userPassword = request.body.password;
    user.create({ username: userName, mobile: contact, email: userEmail, password: userPassword })
        .then(result => {
            console.log(result);
            return response.status(201).json(result);
        }).catch(err => {
            return response.status(500).json({ message: 'Oops! something went wrong' })
        });


}

exports.signin = (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty)
        return response.status(403).json({ errors: errors.array() });
    user.findOne({ email: request.body.email, password: request.body.password })
        .then(result => {
            if (result)
                return response.status(200).json(result);
            else
                return response.status(404).json({ message: 'Invalid user' })
        }).catch(err => {
            return response.status(500).json({ message: 'Oops something went wrong' });
        })
}


exports.viewUser = (request, response) => {
    user.find().then(results => {
            return response.status(200).json(results);
        })
        .catch(err => {
            return response.status(500).json({ message: 'Sever issues' });
        });
}


exports.deleteAccount = (request, response) => {
    user.deleteOne({ _id: request.params.id })
        .then(result => {
            if (result.deletedCount)
                return response.status(202).json({ message: 'Account has been deleted successfully' });
            else
                return response.status(204).json({ message: 'unable to delete' });
        })
        .catch(err => {
            return response.status(500).json({ message: 'Something went wrong' });
        });
}