const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');

const COLLECTION = 'sales'

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.find({ _id: ObjectId(id) })
}

const create = async (Sale) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(Sale);
    return result.insertedId;
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

module.exports.SalesService = {
    getAll,
    getById,
    create,
    update,
    deleteById,
}