const shortId = require('shortid');
const mongoose = require('mongoose')
const express = require('express')

const storeModel = mongoose.model('Store')
// Libs----
const logger = require('../libs/loggerLib')
const apiResponse = require('../libs/responseLib')
const check = require('../libs/checkLib')
const timeLib = require('../libs/timeLib')

// Lists all the products

let listAllProducts = (req, res) => {
    storeModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                logger.captureerror(`Error Occured : ${err}`, 'controller : listAllProducts', 10)
                let response = apiResponse.generate('yes', 'Some error Occured', 500, err)
                res.send(response)
            } else if (check.isEmpty(result)) {
                logger.captureInfo('No Product Found', 'controller : listAllProducts', 10)
                let response = apiResponse.generate('yes', 'No Product Found!!', 404, err)
                res.send(response)
            } else {
                logger.captureInfo('Products Found Succesfully', 'controller : listAllProducts', 10)
                let response = apiResponse.generate('No', 'Products Found Succesfully!!', 200, result)
                res.send(response)
            }
        })
}

// Details of product-------

let productDetail = (req, res) => {
    storeModel.find({ 'productId': req.params.id }, (err, result) => {
        if (err) {
            logger.captureerror(`Error Occured : ${err}`, 'controller : Produc Detail', 10)
            let response = apiResponse.generate('yes', 'Some error Occured', 500, err)
            res.send(response)
        } else if (check.isEmpty(result)) {
            logger.captureInfo('No Product Found', 'controller : listAllProducts', 10)
            let response = apiResponse.generate('yes', 'No Product Found!!', 404, err)
            res.send(response)
        } else {
            logger.captureInfo('Products Found Succesfully', 'controller : listAllProducts', 10)
            let response = apiResponse.generate('No', 'Product Found Succesfully!!', 200, result)
            res.send(response)
        }
    })
}

// Creating a product------------

let createProduct = (req, res) => {
    const uniqueId = shortId.generate()
    const today = timeLib.now;

    let productEntry = new storeModel({
        productId: uniqueId,
        productName: req.body.name,
        productCategory: req.body.category,
        isAvailable: req.body.availability,
        description: req.body.description,
        dateOfEntry: today,
        warrantyInYears: req.body.warranty,
        price: req.body.price
    })
    productEntry.colorsAvailable = check.isEmpty(req.body.colors) ? [] : req.body.colors.split(',')
    productEntry.save((err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:createProduct', 10)
            let response = apiResponse.generate('Yes', 'Some Error Occured', 500, err)
            res.send(response)
        } else {
            let response = apiResponse.generate('No', 'Product Created Successfully!!', 200, result)
            res.send(response)
        }
    })
}

// Updating the details of a product ----------

let editProduct = (req, res) => {
    let options = req.body;
    storeModel.update({ 'productId': req.params.id }, options, { multi: true }).exec((err, result) => {

        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:editProduct', 10)
            let response = apiResponse.generate('Yes', 'Some error Occured!!', 500, err)
            res.send(response)
        } else if (check.isEmpty(result)) {
            logger.captureInfo('No Blog Found!!', 'controller:editProduct', 10)
            let response = apiResponse.generate('Yes', 'No Product Found', 404, err)
            res.send(response)
        } else {
            logger.captureInfo('Product updated Successfully !!', 'controller:editProduct', 10)
            let response = apiResponse.generate('No', 'Product updated Successfully !!', 200, result)
            res.send(response)
        }
    });
}

// Deleting a product from catalog ------

let deleteProduct = (req, res) => {
    storeModel.remove({ 'productId': req.params.id }, (err, result) => {
        if (err) {
            logger.captureerror(`Some Error Occured ${err}`, 'controller:deleteProduct', 10)
            let response = apiResponse.generate('Yes', 'Some error Occured!!', 500, err)
            res.send(response)
        } else if (check.isEmpty(result)) {
            logger.captureInfo('No Product Found!!', 'controller:deleteProduct', 10)
            let response = apiResponse.generate('Yes', 'No Product Found', 404, err)
            res.send(response)
        } else {
            logger.captureInfo('Product removed Successfully !!', 'controller:deleteProduct', 10)
            let response = apiResponse.generate('No', 'Product removed Successfully !!', 200, result)
            res.send(response)
        }
    })
}

module.exports = {
    listAllProducts: listAllProducts,
    productDetail: productDetail,
    createProduct: createProduct,
    editProduct: editProduct,
    deleteProduct: deleteProduct
}

