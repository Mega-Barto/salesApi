//Toda la configuracion de las variables de entorno
require('dotenv').config();

module.exports.Config = {
    port: process.env.PORT,
    mongoUri:  process.env.MONGO_URI,
    mongoDbname: process.env.MONGO_NAME,
}