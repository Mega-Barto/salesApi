const express = require('express');

const router = express.Router();

const { UsersController } = require('./controller');

module.exports.UsersAPI = (app) => {
    router//especificar una serie de rutas de forma independiente
        //se deben organizar en orden de prioridad
        .get('/', UsersController.getAllUsers)// http://localhost:3000/api/Users
        .get('/:id', UsersController.getUser)// http://localhost:3000/api/Users/23
        .post('/', UsersController.createUser)// http://localhost:3000/api/Users
        .post('/update/:id', UsersController.updateDoc)
        .post('/delete/:id', UsersController.delete)

    app.use('/api/users', router)
}