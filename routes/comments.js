const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments');

router.get('/recipe/:recipe_id', commentsController.getByRecipe);

router.get('/user/:user_id', commentsController.getByUser);

router.get('/:comment_id', commentsController.getById);

router.post('/recipe/:recipe_id', commentsController.createComment);

router.put('/:comment_id', commentsController.editComment);

router.delete('/:comment_id', commentsController.deleteComment);

const ObjectId = require('mongodb').ObjectId; //remove
router.get('/test/:id', async (req, res) => {
    try {
        const recipeId = new ObjectId(req.params.id);
        res.json(recipeId);
    } catch {
        res.json('This no work');
    }
});

module.exports = router;
