const debug = require('debug')('app:m-Sales-controller');
const createError = require('http-errors');
const { SalesService } = require('./services');
const { UsersService } = require('../users');
const { ProductsService } = require('../products');
const { Response } = require('../common/response');

module.exports.SalesController = {
    getAllSales: async (req, res) => {
        try {
            let Sales = await Service.getAll();
            Response.success(res, 200, 'List of Sales', Sales);
            debug('GJ');
        } catch (error) {
            Response.failed(res);
            debug(error);
        }
    },
    getSale: async (req, res) => {
        try {
            const { params: { id } } = req;
            let Sale = await SalesService.getById(id);
            if (!Sale) {
                Response.failed(res, new createError.NotFound())
            } else {
                Response.success(res, 200, 'Information about the Sale', Sale);
            }
            debug('GJ');
        } catch (error) {
            Response.failed(res);
            debug(error);
        }
    },
    createSale: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.failed(res, new createError.BadRequest())
            } else {
                const insertedId = await SalesService.create(body);
                Response.success(res, 200, 'New Sale added!', body);
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
                const result = await SalesService.update(id, body);
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
                const result = await SalesService.deleteById(id);
                Response.success(res, 200, `Document deleted!`);
                debug('GJ');
            }

        } catch (error) {
            debug(error);
            Response.failed(res);
        }
    },

}