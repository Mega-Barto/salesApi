const debug = require('debug')('app:m-products-controller');
const createError = require('http-errors');
const { ProductsService } = require('./services');
const { Response } = require('../common/response');

module.exports.ProductsController = {
    getAllProducts: async (req, res) => {
        try {
            let products = await ProductsService.getAll();
            Response.success(res, 200, 'List of products', products);
            debug('GJ');
        } catch (error) {
            Response.failed(res);
            debug(error);
        }
    },
    getProduct: async (req, res) => {
        try {
            const { params: { id } } = req;
            let product = await ProductsService.getById(id);
            if (!product) {
                Response.failed(res, new createError.NotFound())
            } else {
                Response.success(res, 200, 'Information about the product', product);
            }
            debug('GJ');
        } catch (error) {
            Response.failed(res);
            debug(error);
        }
    },
    createProduct: async (req, res) => {
        try {
            const { body } = req;
            if (!body || Object.keys(body).length === 0) {
                Response.failed(res, new createError.BadRequest())
            } else {
                const insertedId = await ProductsService.create(body);
                Response.success(res, 200, 'New product added!', body);
                debug('GJ');
            }
        } catch (error) {
            Response.failed(res);
            debug(error);
        }
    },
    generateReport: async (req, res) => {
        try {
            ProductsService.genReport(res, 'Inv');

        } catch (error) {
            debug(error);
            Response.failed(res);
        }
    },
    updateDoc: async (req, res) => {
        const { body, params: { id } } = req;
        try {
            if (!body || !id || Object.keys(body).length === 0) {
                Response.failed(res, new createError.BadRequest())
            } else {
                const result = await ProductsService.update(id, body);
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
                const result = await ProductsService.deleteById(id);
                Response.success(res, 200, `Document deleted!`);
                debug('GJ');
            }

        } catch (error) {
            debug(error);
            Response.failed(res);
        }
    },

}