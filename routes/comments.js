const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments');

router.get('/recipe/:recipe_id', commentsController.getByRecipe);

router.get('/user/:user_id', commentsController.getByUser);

router.get('/:comment_id', commentsController.getById);

router.post('/recipe/:comment_id', commentsController.createComment);

router.put('/:comment_id', commentsController.editComment);

router.delete('/:comment_id', commentsController.deleteComment);

module.exports = router;
