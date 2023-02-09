const { ObjectId } = require('mongodb');

const { Database } = require('../database/index');


const COLLECTION = 'users'

const getAll = async () => {
    const collection = await Database(COLLECTION);
    return await collection.find({}).toArray();
}

const getById = async (id) => {
    const collection = await Database(COLLECTION);
    return collection.findOne({ _id: ObjectId(id) })
}

const create = async (User) => {
    const collection = await Database(COLLECTION);
    let result = await collection.insertOne(User);
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

module.exports.UsersService = {
    getAll,
    getById,
    create,
    update,
    deleteById,
}