const user = require('../models/user');

const gettingAllFavorites = (req, res, next) => {
    user.find().then((result) => {
        res.send(result);
    });
};

const gettingFavoritesRecipesFromOneUser = (req, res, next) => {
    const username = req.params.username;

    user.find({ username: username }).then((result) => {
        res.send(result);
    });
};

module.exports = {
    gettingAllFavorites,
    gettingFavoritesRecipesFromOneUser
};
