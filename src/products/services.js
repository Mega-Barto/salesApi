const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');

const { ProductsUtils } = require('./utils');

const COLLECTION = 'products'

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) })
}

const create = async (product) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(product);
    return result.insertedId;
}

const genReport = async (res, name) => {
    let products = await getAll();
    ProductsUtils.excelGenerator(products, res, name)

}

const update = async (id, body) => {
    const collection = await Database(COLLECTION);
    const newDoc = {
        $set: body, //No olvidar el $set
    };
    console.log(id, newDoc);
    return collection.updateOne({ _id: ObjectId(id) }, newDoc, { upsert: false });
}

const deleteById = async (id) => {
    const collection = await Database(COLLECTION);
    const doc = getById(id);
    return collection.deleteOne(doc)
}

module.exports.ProductsService = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    genReport
}