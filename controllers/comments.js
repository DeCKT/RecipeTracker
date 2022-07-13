const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getByRecipe = async (req, res) => {
    // #swagger.tags = ['Comments']

    try {
        const recipeId = new ObjectId(req.params.recipe_id);
        if (!req.params.recipe_id) {
            res.status(500).json('Recipe ID is required!');
        } else {
            const result = await mongodb
                .getDb()
                .db()
                .collection('comments')
                .find({ recipeId: recipeId });
            result.toArray().then((comments) => {
                if (comments.length > 0) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(comments);
                } else {
                    res.status(404).json('Unable to find any comments');
                }
            });
        }
    } catch (error) {
        res.status(500).json('An error occurred!');
    }
};

const getByUser = async (req, res) => {
    // #swagger.tags = ['Comments']

    try {
        if (!req.params.username) {
            res.status(500).json('User email is required!');
        } else {
            const result = await mongodb
                .getDb()
                .db()
                .collection('comments')
                .find({ username: req.params.email });
            result.toArray().then((found) => {
                if (found.length > 0) {
                    res.setHeader('Content-Type', 'application/json');
                    res.status(200).json(found);
                } else {
                    res.status(404).json('Unable to find any comments');
                }
            });
        }
    } catch (error) {
        res.status(500).json('An error occurred!');
    }
};

const getById = async (req, res) => {
    // #swagger.tags = ['Comments']
    try {
        const commentId = new ObjectId(req.params.comment_id);

        const result = await mongodb.getDb().db().collection('comments').find({ _id: commentId });
        result.toArray().then((comments) => {
            if (comments.length > 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(comments[0]);
            } else {
                res.status(404).json('Unable to find comment');
            }
        });
    } catch (error) {
        res.status(500).json('An error occurred!');
    }
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

        if (!req.body.comment || !req.body.email) {
            throw new Error('Fields are required!');
        }

        if (recipeDoesExist) {
            const comment = {
                recipeId: recipeId,
                creator: req.body.username,
                postedDate: postDate,
                comment: req.body.comment
            };

            const result = await mongodb.getDb().db().collection('comments').insertOne(comment);

            if (result.acknowledged) {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json('Successfully added comment');
            } else {
                res.status(500).json('Unable to add comment');
            }
        } else {
            res.status(404).json('Unable to find recipe with ID');
        }
    } catch (error) {
        res.status(500).json(error.message || 'An error occurred!');
    }
    // #swagger.tags = ['Comments']
};

const editComment = async (req, res) => {
    // #swagger.tags = ['Comments']

    try {
        const commentId = new ObjectId(req.params.comment_id);
        const editDate = new Date();

        if (!req.body.comment) {
            throw new Error('Fields are required!');
        }

        const result = await mongodb
            .getDb()
            .db()
            .collection('comments')
            .update(
                { _id: commentId },
                {
                    $set: { comment: req.body.comment, edited: true, postedDate: editDate }
                }
            );

        if (result.acknowledged) {
            res.status(200).json('Successfully edited comment');
        } else {
            res.status(500).json('Unable to update comment');
        }
    } catch (error) {
        res.status(500).json(error.message || 'An error occurred!');
    }
};

const deleteComment = async (req, res) => {
    // #swagger.tags = ['Comments']

    try {
        const commentId = new ObjectId(req.params.comment_id);

        const result = await mongodb.getDb().db().collection('comments').remove({ _id: commentId });
        if (result.acknowledged && result.deletedCount) {
            res.status(200).json('Successfully deleted comment');
        } else {
            res.status(400).json('Bad request!');
        }
    } catch (error) {
        res.status(500).json(error.message || 'An error occurred!');
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
