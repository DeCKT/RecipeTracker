// const db = require('../db/connect');
const mongodb = require('../db/connect');
// const User = require('../db/connect').getDb().db().collection('user');
const passwordUtil = require('../util/passwordComplexityCheck');

module.exports.create = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        if (!req.body.username || !req.body.password) {
            res.status(400).send({ message: 'Content can not be empty!' });
            return;
        }
        const password = req.body.password;
        const passwordCheck = passwordUtil.passwordPass(password);
        if (passwordCheck.error) {
            res.status(400).send({ message: passwordCheck.error });
            return;
        }

        const user = {
            username: req.body.username,
            password: req.body.password
        };
        const result = await mongodb.getDb().db().collection('users').insertOne(user);

        if (result.acknowledged) {
            res.status(201).json(result);
        } else {
            res.status(500).json(
                result.error || 'Some error occurred while creating the recipe entry.'
            );
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.getAll = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const result = await mongodb.getDb().db().collection('users').find();
        result
            .toArray()
            .then((lists) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(lists);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving users.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.getUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const username = req.params.username;
        const result = await mongodb.getDb().db().collection('users').find({ email: username });
        result
            .toArray()
            .then((lists) => {
                res.setHeader('Content-Type', 'application/json');
                res.status(200).json(lists[0]);
            })
            .catch((err) => {
                res.status(500).send({
                    message: err.message || 'Some error occurred while retrieving users.'
                });
            });
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.updateUser = async (req, res) => {
    //#swagger.tags = ['Users']
    try {
        const username = req.params.username;
        if (!username) {
            res.status(400).send({ message: 'Invalid Username Supplied' });
            return;
        }
        const password = req.body.password;
        const passwordCheck = passwordUtil.passwordPass(password);
        if (passwordCheck.error) {
            res.status(400).send({ message: passwordCheck.error });
            return;
        }
        const user = {
            username: req.body.username,
            password: req.body.password
        };
        const result = await mongodb
            .getDb()
            .db()
            .collection('users')
            .updateOne(
                { email: username },
                {
                    $set: {
                        email: req.body.username,
                        password: req.body.password
                    }
                }
            );

        if (result.acknowledged) {
            res.status(201).json(result);
        } else {
            res.status(500).json(result.error || 'Some error occurred while modifying the user.');
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

module.exports.deleteUser = async (req, res) => {
    // #swagger.tags = ['Users']
    try {
        const username = req.params.username;

        if (!username) {
            res.status(400).json({ message: 'Invalid Username Supplied' });
            return;
        }
        const result = await mongodb
            .getDb()
            .db()
            .collection('users')
            .deleteOne({ email: username });
        if (result.deletedCount > 0) {
            res.status(204).json(result);
        } else {
            res.status(500).json(result.error || 'Some error occurred while deleting the user.');
        }
    } catch (err) {
        res.status(500).json(err || 'Some error occurred while deleting the user.');
    }
};
