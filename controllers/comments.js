const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getByRecipe = async (req, res) => {
    // #swagger.tags = ['Comments']

    // TODO: error handling

    if (!req.params.recipe_id) {
        res.status(500).json('Recipe ID is required!');
    } else {
        const result = await mongodb
            .getDb()
            .db()
            .collection('comments')
            .find({ recipeId: req.params.recipe_id });
        result.toArray().then((comments) => {
            if (comments.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(comments);
            } else {
                res.status(404).json('Unable to find any comments');
            }
        });
    }
};

const getByUser = async (req, res) => {
    // #swagger.tags = ['Comments']

    // TODO: error handling
    if (!req.params.user_id) {
        res.status(500).json('User ID is required!');
    } else {
        const result = await mongodb
            .getDb()
            .db()
            .collection('comments')
            .find({ creatorId: req.params.user_id });
        result.toArray().then((comments) => {
            if (comments.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(comments);
            } else {
                res.status(404).json('Unable to find any comments');
            }
        });
    }
};

const getById = async (req, res) => {
    // #swagger.tags = ['Comments']

    // TODO: error handling

    if (!req.params.comment_id) {
        res.status(500).json('Comment ID is required!');
    } else {
        const result = await mongodb
            .getDb()
            .db()
            .collection('comments')
            .find({ _id: req.params.comment_id });
        result.toArray().then((comments) => {
            if (comments.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(comments[0]);
            } else {
                res.status(404).json('Unable to find comment');
            }
        });
    }
};

const createComment = async (req, res) => {
    // #swagger.tags = ['Comments']

    // TODO: error handling

    if (!req.params.recipe_id) {
        res.status(500).json('Recipe ID is required!');
    } else {
        const postDate = new Date();
        const comment = {
            recipeId: req.params.recipe_id,
            creatorId: req.body.user_id, // should user_id come from body, params, or somewhere else?
            postedDate: postDate,
            comment: req.body.comment
        };

        const result = await mongodb.getDb().db().collection('comments').insertOne(comment);

        if (result.acknowledged) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(result);
        } else {
            res.status(500).json('Unable to add comment');
        }
    }
};

const editComment = async (req, res) => {
    // #swagger.tags = ['Comments']

    // TODO: error handling

    const commentId = new ObjectId(req.params.comment_id);
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

    const commentId = new ObjectId(req.params.comment_id);
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
