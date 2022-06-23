const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const schema = mongoose.Schema;

let userSchema = new schema(
    {
        username: String,
        password: String
    },
    {
        collection: 'users',
        versionKey: false
    }
);

const user = mongoose.model('trackerDB', userSchema);

module.exports = user;
