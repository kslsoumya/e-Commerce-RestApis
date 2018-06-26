
let apiResponse =require('../libs/responseLib')
let errorHandler = (err, req, res, next) => {
    console.log('Application Error handler occured')
    console.log(err)
    let response = apiResponse.generate('yes', 'Some error occured at global level!', 500, err)
    res.send(response)
}

let notFoundHandler = (req, res, next) => {
    console.log('Global Not Found handler called')
    let response = apiResponse.generate('yes', 'Route not found in the application', 404, [])
    res.send(response)

}

module.exports = {
    errorHandler: errorHandler,
    notFoundHandler: notFoundHandler
}

