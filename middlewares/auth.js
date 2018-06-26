
const logger = require('../libs/loggerLib')
const apiResponse = require('../libs/responseLib')
const check = require('../libs/checkLib')
const express = require('express')
const mongoose = require('mongoose')
let userModel = mongoose.model('User')

// Authentication for using Api ---

let isAuthenticated = (req, res, next) => {
    if (req.params.authToken || req.query.authToken || req.header('authToken')) {
        if (req.params.authToken === 'Admin' || req.query.authToken === "Admin" || req.header('authToken') === "Admin") {
            req.user = { fullName: "Admin", userId: "Admin" }
            next()
        }
        else {
            logger.captureerror('Incorrect Authentication token', 'Authentication MiddleWare', 5)
            let response = apiResponse.generate('yes', 'Incorrect Authentication token', 403, null)
            res.send(apiResponse)
        }
    } else {
        logger.captureerror('Authentication token missing', 'Authentication MiddleWare', 5)
        let response = apiResponse.generate('yes', 'Authentication token missing', 403, null)
        res.send(apiResponse)
    }
}

// Authentication for registered users ---

let userAuthentication = (req, res, next) => {
    let user = req.body.userName ? req.body.userName : req.header('userName')
    let pwd = req.body.password ? req.body.password : req.header('password')

    if (user && pwd) {
        userModel.findOne({ 'userName': user }, (err, result) => {
            if (err) {
                logger.captureerror(`Some error Occured :${err}`, ' User Authentication MiddleWare', 10)
                let response = apiResponse.generate('yes', 'Some error Occured', 500, 'Some error Occured')
                res.send(response)
            } else if (check.isEmpty(result)) {
                logger.captureerror('User Not Found', ' User Authentication MiddleWare', 5)
                let response = apiResponse.generate('yes', 'User Not Found', 404, 'User Not Found')
                res.send(response)
            } else {
                if (result.password === pwd) {
                    next()
                } else {
                    logger.captureerror('Incorrect  Password', ' User Authentication MiddleWare', 5)
                    let response = apiResponse.generate('yes', 'Incorrect  Password', 403, 'Incorrect  Password')
                    res.send(response)

                }
            }
        })
    }
    else {
        logger.captureerror('User Name or password is missing', ' User Authentication MiddleWare', 5)
        let response = apiResponse.generate('yes', 'User Name or password is missing', 403, 'User Name or password is missing')
        res.send(response)

    }
}

module.exports = {
    isAuthenticated: isAuthenticated,
    userAuthentication: userAuthentication
}