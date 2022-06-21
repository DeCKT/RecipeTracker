const express = require('express');

// const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const connect = require('./db/connect');
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL
};

// app.use(cors());
app.use(express.json());
app.use(auth(config));
app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});
app.use('/', require('./routes'));

//Change
connect.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(process.env.PORT || 3000);
        console.log(`Connected to DB and listening on ${port}`);
    }
});
