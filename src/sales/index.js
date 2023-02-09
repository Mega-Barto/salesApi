const express = require('express');

const router = express.Router();

const { SalesController } = require('./controller');

module.exports.SalesAPI = (app) => {
    router//especificar una serie de rutas de forma independiente
        //se deben organizar en orden de prioridad
        .get('/', SalesController.getAllSales)// http://localhost:3000/api/Sales
        .get('/:id', SalesController.getSale)// http://localhost:3000/api/Sales/23
        .post('/', SalesController.createSale)// http://localhost:3000/api/Sales
        .post('/update/:id', SalesController.updateDoc)
        .post('/delete/:id', SalesController.delete)

    app.use('/api/sales', router)
}