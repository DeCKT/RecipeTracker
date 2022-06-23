const express = require('express');
const router = express.Router();

const {
    gettingAllFavorites,
    gettingFavoritesRecipesFromOneUser
} = require('../controllers/favorites');

router.get('/', gettingAllFavorites);

// router.get('/:username', gettingFavoritesRecipesFromOneUser);

// router.put('/:username', () => {
//     console.log('Updating favorite recipe');
// });

// router.post('/:username', () => {
//     console.log('Putting new favorite recipe into one user recipes');
// });

// router.delete('/:username', () => {
//     console.log('Deleting one favorites recipe');
// });

module.exports = router;
