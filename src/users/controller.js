const debug = require('debug')('app:m-users-controller');
const createError = require('http-errors');
const { UsersService } = require('./services');
const { Response } = require('../common/response');

module.exports.UsersController = {
    getAllUsers: async (req, res) => {
        try {
            let Users = await Service.getAll();
            Response.success(res, 200, 'List of Users', Users);
            debug('GJ');
        } catch (error) {
            Response.failed(res);
            debug(error);
        }
    },
    getUser: async (req, res) => {
        try {
            const { params: { id } } = req;
            let User = await UsersService.getById(id);
            if (!User) {
                Response.failed(res, new createError.NotFound())
            } else {
                Response.success(res, 200, 'Information about the User', User);
            }
            debug('GJ');
        } catch (error) {
            Response.failed(res);
            debug(error);
        }
    },
    createUser: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.failed(res, new createError.BadRequest())
            } else {
                const insertedId = await UsersService.create(body);
                Response.success(res, 200, 'New User added!', body);
                debug('GJ');
            }
        } catch (error) {
            Response.failed(res);
            debug(error);
        }
    },
    updateDoc: async (req, res) => {
        const { body, params: { id } } = req;
        try {
            if (!body || !id || Object.keys(body).length === 0) {
                Response.failed(res, new createError.BadRequest())
            } else {
                const result = await UsersService.update(id, body);
                Response.success(res, 200, `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`, body);
                debug('GJ');
            }
        } catch (error) {
            debug(error);
            Response.failed(res);
        }
    },
    delete: async (req, res) => {
        const { params: { id } } = req;
        try {
            if (!id) {
                Response.failed(res, new createError.BadRequest())
            } else {
                const result = await UsersService.deleteById(id);
                Response.success(res, 200, `Document deleted!`);
                debug('GJ');
            }

        } catch (error) {
            debug(error);
            Response.failed(res);
        }
    },

}