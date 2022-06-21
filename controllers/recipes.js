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
        title: req.body.title,
        image: req.body.image,
        ingredients: req.body.ingredients,
        prices: req.body.prices,
        time: req.body.time,
        servingSize: req.body.servingSize,
        instructions: req.body.instructions,
        rating: req.body.rating,
        saved: req.body.saved,
        recipeBackstory: req.body.recipeBackstory,
        recipeBook: req.body.recipeBook,
        recipeCreator: req.body.recipeCreator
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
        title: req.body.title,
        image: req.body.image,
        ingredients: req.body.ingredients,
        prices: req.body.prices,
        time: req.body.time,
        servingSize: req.body.servingSize,
        instructions: req.body.instructions,
        rating: req.body.rating,
        saved: req.body.saved,
        recipeBackstory: req.body.recipeBackstory,
        recipeBook: req.body.recipeBook,
        recipeCreator: req.body.recipeCreator
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
