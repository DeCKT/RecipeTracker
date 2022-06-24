const mongoose = require('mongoose');
const schema = mongoose.Schema;

let favoriteSchema = new schema(
    {
        username: String,
        favorites: []
    },
    {
        collection: 'favorites',
        versionKey: false
    }
);

const favorite = mongoose.model('favorite', favoriteSchema);

module.exports = favorite;
