const express = require('express');
const router = express.Router();

const recipesController = require('../controllers/recipes');

router.get('/', recipesController.getAll);

router.get('/:id', recipesController.getSingle);

router.post('/add', recipesController.createEntry);

router.put('/:id', recipesController.modifyEntry);

router.delete('/:id', recipesController.deleteEntry);

module.exports = router;
