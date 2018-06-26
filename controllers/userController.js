
const mongoose = require('mongoose')
const express = require('express')
const userModel = mongoose.model('User')
const storeModel = mongoose.model('Store')
const apiResponse = require('../libs/responseLib')
const logger = require('../libs/loggerLib')
const check = require('../libs/checkLib')

// Registering user-------------

let registerUser = (req, res) => {
    let newUser = new userModel({
        userName: req.body.userName?req.body.userName:req.header('userName'),
        password: req.body.password?req.body.password:req.header('password')
    })
    newUser.cartCount = newUser.cartItems.length;
    newUser.save((err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'User controller:registerUser', 10)
            let response = apiResponse.generate('Yes', 'Some Error Occured', 500, err)
            res.send(response)
        } else {
            logger.captureInfo('User Created!!', 'User Registered Successfully', 10)
            let response = apiResponse.generate('No', 'User Registered Successfully!!', 200, result)
            res.send(response)
        }
    })
}

// View user details------

let getUserDetails = (req, res) => {
    userModel.findOne({ 'userName': req.header('userName') }, (err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'userController: getUserDetails', 10)
            let response = apiResponse.generate('Yes', 'Some error Occured!!', 500, err)
            res.send(response)
        } else if (check.isEmpty(result)) {
            logger.captureInfo('No User Found!!', 'UserController: getUserDetails', 10)
            let response = apiResponse.generate('Yes', 'No User Found', 404, err)
            res.send(response)
        } else {
            logger.captureInfo('User Found!!', 'UserController: getUserDetails', 10)
            let response = apiResponse.generate('Yes', 'User Details Found !!', 200, result)
            res.send(response)
        }
    })
}

// Adding a product to cart for a user--------

let addProductToCart = (req, res) => {
    let items = {};
    storeModel.findOne({ 'productId': req.params.id }, (err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'userController:addProductToCart', 10)
            let response = apiResponse.generate('Yes', 'Some error Occured!!', 500, err)
            res.send(response)
        } else if (check.isEmpty(result)) {
            logger.captureInfo('No Product Found!!', 'UserController:addProductToCart', 10)
            let response = apiResponse.generate('Yes', 'No Product Found', 404, err)
            res.send(response)
        } else {
            items.name = result.productName;
            items.id = result.productId;
            items.quantity = req.params.qty;
        }
    });
    userModel.findOne({ 'userName': req.body.userName }, (err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'userController:addProductToCart', 10)
            let response = apiResponse.generate('Yes', 'Some error Occured!!', 500, err)
            res.send(response)
        } else if (check.isEmpty(result)) {
            logger.captureInfo('No User Found!!', 'UserController:addProductToCart', 10)
            let response = apiResponse.generate('Yes', 'No User Found', 404, err)
            res.send(response)
        } else {
            let isFound = false;
            result.cartItems.forEach((element) => {
                if(element !== null) {
                if (element.id === items.id) {
                    isFound = true;
                }
            }
            })
            if (!isFound) {
                result.cartItems.push(items)
                result.cartCount += 1;
                result.save((err, result) => {
                    if (err) {
                        logger.captureerror('Some Error Occured', 'UserController:addProductToCart', 5)
                        let response = apiResponse.generate('yes', 'Some error Occured !!', 500, err)
                        res.send(response)
                    }
                    else {
                        logger.captureInfo('Added to cart successfully', 'UserController:addProductToCart', 10)
                        let response = apiResponse.generate('No', 'Added to cart successfully!!', 200, result)
                        res.send(response)
                    }
                })
            } else {
                logger.captureInfo('Product already exists', 'UserController:addProductToCart', 10)
                let response = apiResponse.generate('No', 'Product already exists in your cart !!', 200)
                res.send(response)
            }
        }
    });
}

// Removing a product from cart for a user-----------

let removeFromCart = (req, res) => {
    let itemId = req.params.id;
    userModel.findOne({ 'userName': req.body.userName }, (err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'userController:removeFromCart', 10)
            let response = apiResponse.generate('Yes', 'Some error Occured!!', 500, err)
            res.send(response)
        } else if (check.isEmpty(result)) {
            logger.captureInfo('No User Found!!', 'UserController:removeFromCart', 10)
            let response = apiResponse.generate('Yes', 'No User Found', 404, err)
            res.send(response)
        } else {
            let isFound = false;
            result.cartItems.forEach((element, index) => {
                console.log('------' + element)
                if (element.id === itemId) {
                    isFound = true;
                    result.cartItems.splice(index, 1);
                }
            });
            if (isFound) {
                result.cartCount = result.cartItems.length;
                result.save((err, result) => {
                    if (err) {
                        logger.captureerror('Some Error Occured', 'UserController:removeFromCart', 5)
                        let response = apiResponse.generate('yes', 'Some error Occured !!', 500, err)
                        res.send(response)
                    }
                    else {
                        logger.captureInfo('Deleted from cart successfully', 'UserController:removeFromCart', 10)
                        let response = apiResponse.generate('No', 'Deleted from cart successfully!!', 200, result)
                        res.send(response)
                    }
                })
            } else {
                logger.captureerror('Product Not Found', 'UserController:removeFromCart', 5)
                let response = apiResponse.generate('yes', 'Product Not Found in your cart !!', 404)
                res.send(response)
            }
        }
    })
}

// Deleting a user from DB-----------

let deleteUser = (req, res) => {
    userModel.remove({ 'userName': req.body.userName }, (err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'userController:deleteUser', 10)
            let response = apiResponse.generate('Yes', 'Some error Occured!!', 500, err)
            res.send(response)
        } else if (check.isEmpty(result)) {
            logger.captureInfo('No User Found!!', 'UserController:deleteUser', 10)
            let response = apiResponse.generate('Yes', 'No User Found', 404, err)
            res.send(response)
        } else {
            logger.captureInfo('User Deleted Successfully !!', 'UserController:deleteUser', 10)
            let response = apiResponse.generate('No', 'User Deleted Successfully !!', 200, result)
            res.send(response)
        }
    })
}

module.exports = {
    registerUser: registerUser,
    getUserDetails: getUserDetails,
    deleteUser: deleteUser,
    addProductToCart: addProductToCart,
    removeFromCart: removeFromCart
}