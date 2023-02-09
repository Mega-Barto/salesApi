const express = require('express');
const debug = require('debug')('app:main');

const { Config } = require('./src/config/index');
const { ProductsAPI } = require('./src/products/index');
const { UsersAPI } = require('./src/users/index');
const { SalesAPI } = require('./src/sales/index');
const { IndexAPI, NotFoundAPI } = require('./src/index');
const app = express();

app.use(express.json());

IndexAPI(app);//Primero que todo
ProductsAPI(app);
UsersAPI(app);
SalesAPI(app);
NotFoundAPI(app);//Ultimo que todo


//modules

app.listen(Config.port, () => {
    debug(`Server hearing in port ${Config.port}`);
});