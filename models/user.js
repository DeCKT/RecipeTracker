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

const user = mongoose.model('user', userSchema);

module.exports = user;
