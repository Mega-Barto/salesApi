const { MongoClient } = require('mongodb');
const debug = require('debug')('app:m-database');

const { Config } = require('../config/index');

var connection = null
module.exports.Database = (collection) =>
    new Promise(async (res, rej) => { //Singleton
        try {
            if (!connection) {//leccion de vida: si no hay conexion, conectese
                const client = new MongoClient(Config.mongoUri);
                connection = await client.connect();
                debug('New connection with MongoDB Succesfully')
            }
            debug('Reusing connection');
            const db = connection.db(Config.mongoDbname);
            res(db.collection(collection));
        } catch (error) {
            rej(error);
        }
    });