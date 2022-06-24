const mongoose = require('mongoose');
const schema = mongoose.Schema;

let recipeSchema = new schema(
    {
        image: String,
        ingredients: [],
        instructions: String,
        prices: String,
        rating: String,
        recipeBackstory: String,
        recipeBook: String,
        recipeCreator: String,
        saved: Boolean,
        servingSize: String,
        time: String,
        title: String
    },
    {
        collection: 'recipes',
        versionKey: false
    }
);

const user = mongoose.model('recipe', recipeSchema);

module.exports = user;
