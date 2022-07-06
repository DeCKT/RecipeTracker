const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getByRecipe = async (req, res) => {
    // #swagger.tags = ['Comments']

    // TODO: error handling

    console.log(req.params);

    if (!req.params.recipe_id) {
        res.status(500).json('Recipe ID is required!');
    } else {
        try {
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
                    res.status(404).json(comments);
                }
            });
        } catch (error) {
            res.status(500).json('An error occurred.');
        }
    }
};

const getByUser = async (req, res) => {
    // #swagger.tags = ['Comments']
    console.log('Not Done, finish contract');
};

const getById = async (req, res) => {
    // #swagger.tags = ['Comments']
    const result = await mongodb.getDb().db().collection('comments').find({ _id: req.params.id });
    result.toArray().then((comments) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(comments[0]);
    });
};

const recipeExists = async (recipeId) => {
    const recipe = await mongodb.getDb().db().collection('recipes').find({ _id: recipeId });

    return recipe.toArray().then((recipe) => {
        if (recipe.length > 0) {
            return true;
        } else {
            return false;
        }
    });
};

const createComment = async (req, res) => {
    try {
        const postDate = new Date();
        const recipeId = new ObjectId(req.params.recipe_id);

        let recipeDoesExist = await recipeExists(recipeId);

        if (recipeDoesExist) {
            const comment = {
                recipeId: recipeId,
                creatorId: req.body.creatorId,
                postedDate: postDate,
                comment: req.body.comment
            };

            const result = await mongodb.getDb().db().collection('comments').insertOne(comment);

            if (result.acknowledged) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(result);
            }
        } else {
            res.status(500).json('Unable to find recipe with ID');
        }
    } catch (error) {
        console.log(error);
    }
    // #swagger.tags = ['Comments']
};

const editComment = async (req, res) => {
    // #swagger.tags = ['Comments']
    const commentId = new ObjectId(req.params.id);

    const result = await mongodb
        .getDb()
        .db()
        .collection('comments')
        .findAndModify({
            query: { _id: commentId },
            update: {
                $set: { comment: req.body.comment, edited: true },
                $currentDate: { datePosted: { $type: 'date' } }
            }
        });

    if (result.acknowledged) {
        res.status(200).json(result);
    } else {
        res.status(500).json('error occurred!');
    }
};

const deleteComment = async (req, res) => {
    // #swagger.tags = ['Comments']
    console.log('Not Done, finish contract');
};

module.exports = {
    getByRecipe,
    getByUser,
    createComment,
    getById,
    editComment,
    deleteComment
};
