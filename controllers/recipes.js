const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// const getAll = async (req, res, next) => {
const getAll = async (req, res) => {
    // #swagger.tags = ['Recipes']

    const result = await mongodb.getDb().db().collection('recipes').find();
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists);
    });
};
// const getSingle = async (req, res, next) => {
const getSingle = async (req, res) => {
    // #swagger.tags = ['Recipes']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('recipes').find({ _id: userId });
    result.toArray().then((lists) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(lists[0]);
    });
};

const createEntry = async (req, res) => {
    // #swagger.tags = ['Recipes']
    const recipe = {
        entryName: req.body.entryName,
        date: req.body.date,
        body: req.body.body,
        tags: req.body.tags,
        backColor: req.body.backColor,
        font: req.body.font
    };
    const result = await mongodb.getDb().db().collection('recipes').insertOne(journal);

    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(
            result.error || 'Some error occurred while creating the journal entry.'
        );
    }
};

const modifyEntry = async (req, res) => {
    // #swagger.tags = ['Recipes']
    const userId = new ObjectId(req.params.id);
    const recipe = {
        entryName: req.body.entryName,
        date: req.body.date,
        body: req.body.body,
        tags: req.body.tags,
        backColor: req.body.backColor,
        font: req.body.font
    };
    const result = await mongodb
        .getDb()
        .db()
        .collection('recipes')
        .replaceOne({ _id: userId }, recipe);

    if (result.acknowledged) {
        res.status(201).json(result);
    } else {
        res.status(500).json(
            result.error || 'Some error occurred while modifying the journal entry.'
        );
    }
};

const deleteEntry = async (req, res) => {
    // #swagger.tags = ['Recipes']
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('recipes').remove({ _id: userId }, true);

    if (result.deletedCount > 0) {
        res.status(204).json(result);
    } else {
        res.status(500).json(
            result.error || 'Some error occurred while deleting the recipe entry.'
        );
    }
};

module.exports = { getAll, getSingle, createEntry, modifyEntry, deleteEntry };
