const user = require('../models/user');
const recipe = require('../models/recipe');
const favorite = require('../models/favorite');

const gettingAllFavorites = (req, res, next) => {
    favorite.find().then((result) => {
        res.send(result);
    });
};

const gettingFavoritesRecipesFromOneUser = (req, res, next) => {
    const lookUp = { username: req.params.username };

    user.find(lookUp).then((result) => {
        favorite.find(lookUp).then((result) => {
            res.send(result);
        });
    });
};

const updateUserFavorite = (req, res, next) => {
    var updateData = {
        username: req.body.username
    };

    favorite.find({ username: updateData['username'] }).then((result) => {
        res.send(result[0]);
    });
};

const addFavoriteToUser = (req, res, next) => {
    const username = req.params.username;
    const recipeId = req.params.recipeId;

    recipe.find({ _id: recipeId }).then((result) => {
        let foodAdd = result;
        favorite.find({ username: username }).then((result) => {
            // res.send(result[0]['favorites'][0]['_id']);
            // res.send(foodAdd[0]['_id']);
            // var numero = result[0]['favorites'].length;
            // var copia = false;

            result[0]['favorites'].push(foodAdd[0]);
            let updateFavorite = result[0];
            favorite.findByIdAndUpdate(result[0]['_id'], updateFavorite, () => {
                res.send(updateFavorite);
            });
        });
    });
};

module.exports = {
    gettingAllFavorites,
    gettingFavoritesRecipesFromOneUser,
    updateUserFavorite,
    addFavoriteToUser
};
