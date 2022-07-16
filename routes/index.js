const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const { requiresAuth } = require('express-openid-connect');

router.use('/api-docs', requiresAuth(), swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/recipes', requiresAuth(), require('./recipes'));

router.use('/user', requiresAuth(), require('./user'));

router.use('/comments', require('./comments'));

router.use('/favorites', require('./favorites'));

module.exports = router;
