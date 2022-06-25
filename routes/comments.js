const express = require('express');
const router = express.Router();

const commentsController = require('../controllers/comments');

router.get('/recipe/:id', commentsController.getByRecipe);

router.get('/user/:id', commentsController.getByUser);

router.get('/:id', commentsController.getById);

router.post('/recipe/:id', commentsController.createComment);

router.put('/:id', commentsController.editComment);

router.delete('/:id', commentsController.deleteComment);

module.exports = router;
