const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger-output.json');
const { requiresAuth } = require('express-openid-connect');

router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.use('/journal', requiresAuth(), require('./journal'));

router.use('/user', requiresAuth(), require('./user'));

module.exports = router;
