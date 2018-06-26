const express = require('express')
const mongoose = require('mongoose')
const http = require('http')
const config = require('./config/storeConfig')
const globalErrorHandler = require('./middlewares/appErrorHandler')
const routeLoggerMiddleware = require('./middlewares/routeLogger')
const app = express()
const fs = require('fs')
const cookieParser = require('cookie-parser')
const logger = require('./libs/loggerLib')
const bodyParser = require('body-parser')
const helmet = require('helmet')


// App level middle wares----------

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(globalErrorHandler.errorHandler);

app.use(routeLoggerMiddleware.logIp)
app.use(helmet())


// Bootstrap Models ------------

const modelsPath = './models'
fs.readdirSync(modelsPath).forEach((file) => {
    if (-file.indexOf('.js')) {
        require(modelsPath + '/' + file);

    }
})

// Bootstrap routes ----------


const routersPath = './routes'

fs.readdirSync(routersPath).forEach((file) => {
    if (-file.indexOf('.js')) {
        console.log('opening this file');
        console.log(routersPath + '/' + file);
        let route = require(routersPath + '/' + file);
        route.setRouter(app)

    }
})

app.use(globalErrorHandler.notFoundHandler);


// create HTTP server

const server = http.createServer(app)
console.log(config)
server.listen(config.port)
server.on('error', onError)
server.on('listening', onListening)


// Event Listener for HTTP server "Listening" event


function onListening() {
    var addr = server.address()
    var bind = typeof addr === 'string'
        ? 'pipe' + addr
        : 'port' + addr.port;
    ('listening on' + bind)
    logger.captureInfo('Server listening on port' + addr.port, 'ServerOnListen Handler')
    let db = mongoose.connect(config.db.uri)

}

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at :Promise', p, 'reason:', reason)

    // application specific logging, throwoing an error, or other logic here
})


// Event Listener for HTTP server "error " event

function onError() {

    if (error.syscall !== 'listen') {
        logger.captureerror(error.coded + 'not equal listen', 'serverOnErrorHandler', 10)
        throw error
    }

    //   handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            logger.captureerror(error.coded + ':elevated privileges required', 'serverOnErrorHandler', 10)
            process.exit(1)
            break

        case 'EADDRINUSE':
            logger.captureerror(error.coded + ':port is already in use', 'serverOnErrorHandler', 10)
            process.exit(1)
            break

        default:
            logger.captureerror(error.coded + ':some unknown error', 'serverOnErrorHandler', 10)
            throw error
    }
}