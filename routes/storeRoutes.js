
const express = require('express')
const config = require('../config/storeConfig')
const storeController = require('../controllers/storeController')
const userController = require('../controllers/userController')

const auth = require('../middlewares/auth')

let setRouter = (app) => {
    let baseUrl = config.apiVersion;

    // Routes regarding the products in store -------------

    app.get(baseUrl + '/products/list_all', auth.isAuthenticated, storeController.listAllProducts);

    /**
   * @api {get}  /api/v1/products/list_all  Get all Products
   * @apiVersion 0.0.1
   * @apiName Get all Products
   * @apiGroup Read
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Products Found Successfully",
   *        "status": 200,    
   *        "data" : [
   *                      {
   *                          "productName": "String",
   *                          "productCategory": "String",
   *                           "isAvailable": boolean,
   *                           "description": "String",
   *                           "colorsAvailable": object(type=array),
   *                           "warrantyInYears": "Number,
   *                            "price": number,
   *                           "productId": "String",
   *                           "dateOfEntry": date
   *                        }
   *                    ]
   *     }
   *
   * 
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */

    app.get(baseUrl + '/products/detail/:id', auth.isAuthenticated, storeController.productDetail);


     /**
   * @api {get}  /api/v1/products/detail/:id   Get Product Details
   * @apiVersion 0.0.1
   * @apiName Get details of Product
   * @apiGroup Read
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   *  @apiParam {String}id     The id of the product passed as a URL parameter 
   *
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Found Successfully",
   *        "status": 200,    
   *        "data" : [
   *                      {
   *                          "productName": "String",
   *                          "productCategory": "String",
   *                           "isAvailable": boolean,
   *                           "description": "String",
   *                           "colorsAvailable": object(type=array),
   *                           "warrantyInYears": number,
   *                            "price": number,
   *                           "productId": "String",
   *                           "dateOfEntry": date
   *                        }
   *                    ]
   *     }
   *
   * 
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */


    app.post(baseUrl + '/products/create', auth.isAuthenticated, storeController.createProduct);

      /**
   * @api {post}  /api/v1/products/create   Create a Product
   * @apiVersion 0.0.1
   * @apiName  Create a Product
   * @apiGroup Create
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} name Name of the product passed as a body parameter.
   * @apiParam {String} category Category of the product passed as a body parameter.
   * @apiParam {Boolean} availability Availability of the product passed as a body parameter.
   * @apiParam {String} description Description of the product passed as a body parameter.
   * @apiParam {String} warranty Warranty of the product passed as a body parameter.
   * @apiParam {Number} price Price of the product passed as a body parameter.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Created Successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "productName": "String",
   *                          "productCategory": "String",
   *                           "isAvailable": "Boolean,
   *                           "description": "String",
   *                           "colorsAvailable": object(type=array),
   *                           "warrantyInYears": number,
   *                            "price": number,
   *                           "productId": "String",
   *                           "dateOfEntry": date
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */


    
    app.put(baseUrl + '/products/update/:id', auth.isAuthenticated, storeController.editProduct);

      /**
   * @api {put}  /api/v1/products/update/:id   Update a product 
   * @apiVersion 0.0.1
   * @apiName  Update  Product
   * @apiGroup Edit
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} id Id of the product passed as a URL parameter.
   * @apiParam {String} option  value to be changed passed as a body parameter
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Updated Successfully!!",
   *        "status": 200,    
   *        "data" : {  }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */


    app.post(baseUrl + '/products/remove/:id', auth.isAuthenticated, storeController.deleteProduct);
     /**
   * @api {post}  /api/v1/products/remove/:id    Delete a Product
   * @apiVersion 0.0.1
   * @apiName  Delete  Product
   * @apiGroup Delete
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} id Id of the product passed as a URL parameter.
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Product Deleted Successfully!!",
   *        "status": 200,    
   *        "data" : {  }
   *     }
   *
   * 
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */


    // Routes regarding the users using the store ----------

    app.post(baseUrl + '/register_user', auth.isAuthenticated, userController.registerUser);

    /**
   * @api {post}  /api/v1/register_user   Register a user
   * @apiVersion 0.0.1
   * @apiName  Register a user
   * @apiGroup Create
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} userName Username of the user  for registration passed as a Body parameter or header param.
   * @apiParam {String} password Password of the user for registration passed as a Body parameter or header param.
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "User Registered successfully!!",
   *        "status": 200,    
   *        "data" : { 
   *                          "cartItems": object(type=array),
   *                          "cartCount": number,
   *                           "userName": "String",
   *                           "password": "String"      
   *                   }
   *     }
   *
   * 
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */

    app.get(baseUrl + '/user_details', auth.isAuthenticated, auth.userAuthentication, userController.getUserDetails)

     /**
   * @api {get}  /api/v1/user_details   User Details
   * @apiVersion 0.0.1
   * @apiName  Get User Details
   * @apiGroup Read
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} userName Username of the user  for authentication passed as a  header param.
   * @apiParam {String} password Password of the user for authentication passed as a  header param.
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "User Details Found !!",
   *        "status": 200,    
   *        "data" : { 
   *                           "cartItems": object(type=array),
   *                           "cartCount": number,
   *                           "userName": "String",
   *                           "password": "String"    
   *                  }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */



    app.post(baseUrl + '/addTo_Cart/:id/:qty', auth.isAuthenticated, auth.userAuthentication, userController.addProductToCart);
     
      /**
   * @api {post}  /api/v1/addTo_Cart/:id/:qty   Add Product to cart 
   * @apiVersion 0.0.1
   * @apiName  Update  Cart
   * @apiGroup Edit
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} userName Username of the user  for authentication passed as a Body parameter or header param.
   * @apiParam {String} password Password of the user for authentication passed as a Body parameter or header param.
   * @apiParam {String} id  Id of the product passed as a URL parameter.
   * @apiParam {String} qty Quantity of the product passed as a URL parameter.
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Added to cart successfully!!",
   *        "status": 200,    
   *        "data" : { 
   *                          "cartItems" :[
   *                                    "name":"String",
   *                                     "id" :"String",
   *                                    ] }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */


    app.post(baseUrl + '/remove/from_Cart/:id', auth.isAuthenticated, auth.userAuthentication, userController.removeFromCart);

      /**
   * @api {post}  /api/v1/remove/from_Cart/:id    Remove a Product from cart
   * @apiVersion 0.0.1
   * @apiName  Remove a Product From Cart
   * @apiGroup Edit
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} userName Username of the user  for authentication passed as a Body parameter or header param.
   * @apiParam {String} password Password of the user for authentication passed as a Body parameter or header param.
   * @apiParam {String} id Id of the product passed as a Body parameter or header param.
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "Deleted from cart successfully!!",
   *        "status": 200,    
   *        "data" : {
   *                          "cartItems": object(type=array),
   *                          "cartCount": number,
   *                           "userName": "String",
   *                           "password": "String"
   *                        }
   *     }
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */


    app.post(baseUrl + '/delete_user', auth.isAuthenticated, auth.userAuthentication, userController.deleteUser);

     /**
   * @api {post}  /api/v1/delete_user    Delete User 
   * @apiVersion 0.0.1
   * @apiName  Delete a User
   * @apiGroup Delete
   *
   * @apiParam {String} authToken The token for authentication.(Send authToken as a query Param or header Param or Body param)
   * @apiParam {String} userName Username of the user  for authentication passed as a Body parameter or header param.
   * @apiParam {String} password Password of the user for authentication passed as a Body parameter or header param.
   * 
   * 
   * 
   * 
   * @apiSuccessExample {json} Success-Response:
   *     {
   *       "error": "No",
   *       "message": "User Deleted Successfully!!",
   *        "status": 200,    
   *        "data" : {  }
   *     }
   *
   * 
   *
   * @apiErrorExample  {json} Error-Response:
   *     
   *     {
   *       "error": "Yes",
   *        "message": "Error Occured",
   *         "status":500,
   *          "data":null
   *     }
   */

}

module.exports = {
    setRouter: setRouter
}