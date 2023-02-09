const express = require('express');

const router = express.Router();

const { ProductsController } = require('./controller');

module.exports.ProductsAPI = (app) => {
    router//especificar una serie de rutas de forma independiente
        //se deben organizar en orden de prioridad
        .get('/', ProductsController.getAllProducts)// http://localhost:3000/api/products
        .get('/report', ProductsController.generateReport)
        .get('/:id', ProductsController.getProduct)// http://localhost:3000/api/products/23
        .post('/', ProductsController.createProduct)// http://localhost:3000/api/products
        .post('/update/:id', ProductsController.updateDoc)
        .post('/delete/:id', ProductsController.delete)

    app.use('/api/products', router)
}