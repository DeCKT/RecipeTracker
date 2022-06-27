const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getByRecipe = async (req, res) => {
    // #swagger.tags = ['Comments']

    // TODO: error handling

    const result = await mongodb
        .getDb()
        .db()
        .collection('comments')
        .find({ recipeId: req.params.id });
    result.toArray().then((comments) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(comments);
    });
};

const getByUser = async (req, res) => {
    // #swagger.tags = ['Comments']

    // TODO: error handling

    console.log('Not Done, finish contract');
    const result = await mongodb
        .getDb()
        .db()
        .collection('comments')
        .find({ creatorId: req.params.id });
    result.toArray().then((comments) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(comments);
    });
};

const getById = async (req, res) => {
    // #swagger.tags = ['Comments']

    // TODO: error handling

    const result = await mongodb.getDb().db().collection('comments').find({ _id: req.params.id });
    result.toArray().then((comments) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(comments[0]);
    });
};

const createComment = async (req, res) => {
    // #swagger.tags = ['Comments']

    // TODO: error handling

    const postDate = new Date();
    const comment = {
        recipeId: req.params.id,
        creatorId: req.body.creatorId,
        postedDate: postDate,
        comment: req.body.comment
    };

    const result = await mongodb.getDb().db().collection('comments').insertOne(comment);

    if (result.acknowledged) {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    }
};

const editComment = async (req, res) => {
    // #swagger.tags = ['Comments']

    // TODO: error handling

    const commentId = new ObjectId(req.params.id);
    const postDate = new Date();

    const result = await mongodb
        .getDb()
        .db()
        .collection('comments')
        .updateOne(
            { _id: commentId },
            {
                $set: { comment: req.body.comment, edited: true, postedDate: postDate }
            }
        );

    if (result.acknowledged) {
        res.status(200).json(result);
    } else {
        res.status(500).json('error occurred!');
    }
};

const deleteComment = async (req, res) => {
    // #swagger.tags = ['Comments']

    // TODO: error handling

    const commentId = new ObjectId(req.params.id);
    const result = await mongodb.getDb().db().collection('comments').deleteOne({ _id: commentId });

    if (result.acknowledged) {
        res.status(200).json(result);
    } else {
        res.status(400).json('error occurred!');
    }
};

module.exports = {
    getByRecipe,
    getByUser,
    createComment,
    getById,
    editComment,
    deleteComment
};
