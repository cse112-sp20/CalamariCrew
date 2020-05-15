// Import the express lirbary
const express = require('express');
const path = require('path');
const superagent = require('superagent');
const cors = require('cors');

// Client ID and secret from github application setup
const clientId = 'Iv1.f21e019d2f5b90b2';
const clientSecret = 'c28cfe8ec55cfe8857bc1c37871aede099ebdd92';

// Create a new express application and use
// the express static middleware, to serve all files
// inside the public directory
const app = express();
app.use(express.static(__dirname + 'root'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(
    '/src/libs/chrome-ex-oauth2',
    express.static(__dirname + '/../src/libs/chrome-ex-oauth2')
);

app.get('/oauth/register', (req, res) => {
    const { query } = req;
    const { code } = query;

    if (!code) {
        res.send({
            success: false,
            message: 'Error: no code',
        });
    }
    //console.log(code);
    superagent
        .post(
            `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`
        )
        .set('Accept', 'application/json')
        .end((err, response) => {
            const { access_token } = response.body;
            //const data = response.body;
            //console.log(data);
            //res.send(access_token);
            console.log(typeof(access_token));
            console.log(access_token);
            res.render('signedInSuccess', { data: access_token });
        });
});

// Start the server on port 3000
app.listen(3000, () => console.log('App started on port 3000'));
