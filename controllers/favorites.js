const user = require('../models/user');
const recipe = require('../models/recipe');
const favorite = require('../models/favorite');

const gettingAllFavorites = (req, res, next) => {
    // #swagger.tags = ['Favorites']
    favorite.find().then((result) => {
        res.send(result);
    });
};

const gettingFavoritesRecipesFromOneUser = (req, res, next) => {
    // #swagger.tags = ['Favorites']
    const lookUp = { username: req.params.username };

    user.find(lookUp).then((result) => {
        favorite.find(lookUp).then((result) => {
            res.send(result);
        });
    });
};

const updateUserFavorite = (req, res, next) => {
    // #swagger.tags = ['Favorites']
    const usernamePara = req.params.username;
    var updateData = {
        username: req.body.username
    };

    favorite.find({ username: usernamePara }).then((result) => {
        const id = result[0]['_id'];
        const favorites = result[0]['favorites'];
        updateData['favorites'] = favorites;
        favorite.findByIdAndUpdate(id, updateData, () => {
            res.send('Updated');
        });
    });
};

const addFavoriteToUser = (req, res, next) => {
    // #swagger.tags = ['Favorites']
    const username = req.body.username;
    const recipeId = req.body.recipeId;

    // recipe.find({ _id: recipeId }).then((result) => {
    //     let foodAdd = result;
    //     favorite.find({ username: username }).then((result) => {
    //         result[0]['favorites'].push(foodAdd);
    //         let updateFavorite = result[0];
    //         favorite.findByIdAndUpdate(result[0]['_id'], updateFavorite, () => {
    //             res.send(updateFavorite);
    //         });
    //     });
    // });

    //Code above saves a whole recipe along with all of its data into the favorites.
    //We just want to store the IDs of the recipes we like.

    favorite.find({ username: username }).then((result) => {
        fav = result[0]['favorites'];
        fav.push(recipeId);
        let favoriteId = result[0]['_id'];
        let newFavoriteObj = result[0];

        favorite.findByIdAndUpdate(favoriteId, newFavoriteObj, () => {
            res.send(fav);
        });
        // result[0]['favorites'].push(foodAdd);
    });
};

module.exports = {
    gettingAllFavorites,
    gettingFavoritesRecipesFromOneUser,
    updateUserFavorite,
    addFavoriteToUser
};
