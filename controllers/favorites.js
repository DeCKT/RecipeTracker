const user = require('../models/user');
const recipe = require('../models/recipe');
const favorite = require('../models/favorite');
const createError = require('http-errors');

const gettingAllFavorites = (req, res, next) => {
    // #swagger.tags = ['Favorites']
    favorite
        .find()
        .then((result) => {
            if (result.length == 0) {
                throw createError(404, 'There is not favorites');
            } else {
                res.send(result);
            }
        })
        .catch((error) => {
            next(error);
        });
};

const gettingFavoritesRecipesFromOneUser = (req, res, next) => {
    // #swagger.tags = ['Favorites']
    const lookUp = { username: req.params.username };

    user.find(lookUp).then((result) => {
        favorite
            .find(lookUp)
            .then((result) => {
                if (result.length == 0) {
                    throw createError(404, 'There is no any favorite for this user');
                } else {
                    res.send(result);
                }
            })
            .catch((error) => {
                next(error);
            });
    });
};

const updateUserFavorite = (req, res, next) => {
    // #swagger.tags = ['Favorites']
    const usernamePara = req.params.username;
    var updateData = {
        username: req.body.username
    };

    favorite
        .find({ username: usernamePara })
        .then((result) => {
            if (result.length != 0) {
                const id = result[0]['_id'];
                const favorites = result[0]['favorites'];
                updateData['favorites'] = favorites;
                favorite.findByIdAndUpdate(id, updateData, () => {
                    res.send('Updated');
                });
            } else {
                throw createError(404, 'There is no any favorite section for this user');
            }
        })
        .catch((error) => {
            next(error);
        });
};

const addFavoriteToUser = (req, res, next) => {
    // #swagger.tags = ['Favorites']
    const username = req.body.username;
    const recipeId = req.body.recipeId;

    //We just want to store the IDs of the recipes we like.

    favorite
        .find({ username: username })
        .then((result) => {
            if (result.length != 0) {
                let fav = result[0]['favorites'];
                fav.push(recipeId);
                let favoriteId = result[0]['_id'];
                let newFavoriteObj = result[0];

                favorite.findByIdAndUpdate(favoriteId, newFavoriteObj, () => {
                    res.send(fav);
                });
            } else {
                throw createError(404, 'There is no any favorite section for this user');
            }
        })
        .catch((error) => {
            next(error);
        });
};

const creatingFavoriteForNewUser = (req, res, next) => {
    // #swagger.tags = ['Favorites']
    const username = req.params.username;

    favorite.find({ username: username }).then((result) => {
        if (!result.length) {
            let newData = { username: username, favorite: [] };
            favorite.insertMany(newData);
            res.send('CREATED');
        }
    });
};

const deletingFavorites = (req, res, next) => {
    // #swagger.tags = ['Favorites']
    const username = req.params.username;
    favorite
        .find({ username: username })
        .then((result) => {
            if (result.length != 0) {
                let favoriteId = result[0]['_id'];
                favorite.findByIdAndDelete(favoriteId, () => {
                    res.send('DELETED!');
                });
            } else {
                throw createError(404, 'There is no any favorite section for this user');
            }
        })
        .catch((error) => {
            next(error);
        });
};

module.exports = {
    gettingAllFavorites,
    gettingFavoritesRecipesFromOneUser,
    updateUserFavorite,
    addFavoriteToUser,
    creatingFavoriteForNewUser,
    deletingFavorites
};
