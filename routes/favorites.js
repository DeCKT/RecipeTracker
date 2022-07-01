const express = require('express');
const router = express.Router();

const {
    gettingAllFavorites,
    gettingFavoritesRecipesFromOneUser,
    updateUserFavorite,
    addFavoriteToUser,
    creatingFavoriteForNewUser,
    deletingFavorites
} = require('../controllers/favorites');

router.get('/', gettingAllFavorites);

router.get('/:username', gettingFavoritesRecipesFromOneUser);

router.put('/:username', updateUserFavorite);

router.post('/', addFavoriteToUser);

router.post('/:username', creatingFavoriteForNewUser);

router.delete('/:username', deletingFavorites);

module.exports = router;
