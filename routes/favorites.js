const express = require('express');
const router = express.Router();

const {
    gettingAllFavorites,
    gettingFavoritesRecipesFromOneUser,
    updateUserFavorite,
    addFavoriteToUser
} = require('../controllers/favorites');

router.get('/', gettingAllFavorites);

router.get('/:username', gettingFavoritesRecipesFromOneUser);

router.put('/:username', updateUserFavorite);

router.post('/', addFavoriteToUser);

// router.delete('/:username', () => {
//     console.log('Deleting one favorites recipe');
// });

module.exports = router;
