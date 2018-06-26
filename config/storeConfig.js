
let storeConfig = {}

storeConfig.port = 3000;
storeConfig.allowedCorsOrigin = "*";
storeConfig.env = "dev";
storeConfig.db = {
    uri : "mongodb://127.0.0.1:27017/storeDB"
};
storeConfig.apiVersion = "/api/v1";


module.exports = {
    port: storeConfig.port,
    allowedCorsOrigin: storeConfig.allowedCorsOrigin,
    env: storeConfig.env,
    db: storeConfig.db,
    apiVersion: storeConfig.apiVersion
}




