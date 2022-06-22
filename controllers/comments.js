const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// const getByRecipe = async (req, res) => {

//     const result = await mongodb.getDb().db().collection('recipes').findOne({})
// }

// getByUser

const getById = async (req, res) => {
    const result = await mongodb.getDb().db().collection('comments').find({ _id: req.params.id });
    result.toArray().then((comments) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(comments[0]);
    });
};

const createComment = async (req, res) => {
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

// deleteComment

module.exports = {
    createComment,
    getById,
    editComment
};
