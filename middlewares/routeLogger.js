
const storeConfig = require('../config/storeConfig')

let requestIpLogger = (req,res,next) =>{
    let remoteIp = req.connection.remoteAddress + '://'+ req.connection.remotePort;
    let realIp = req.headers['X-REAL-IP']
    console.log(req.method + 'Request made from '+remoteIp + ' for '+ req.originalUrl);

    if(req.method === 'OPTIONS') {
        console.log('!OPTIONS')
        var headers = {};
        headers["Acess-Control-Allow-Origin"] = "*"
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE,OPTIONS";
        headers["Acess-Control-Allow-Credentials"] = false
        headers["Acess-Control-Max-Age"] = '86400'
        headers["Acess-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override,Content-Type,Accept "

        res.writeHead(200,headers)
        res.send()
    } else {
        // enable or disable cors here

        res.header("Acess-Control-Allow-Origin",storeConfig.allowedCorsOrigin)
        res.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        res.header("Acess-Control-Allow-Headers","Origin, X-Requested-With, Content-Type,Accept")

        next()
        // end CORS config
    }
}

module.exports = {
    logIp :requestIpLogger
}