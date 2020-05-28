// Import the express lirbary
const express = require('express');
const path = require('path');
const superagent = require('superagent');
const bodyParser = require('body-parser');

const storage = require('node-persist');
storage.init(/*·options·...·*/);

// const database = require('./database');
var username = '';

// Client ID and secret from github application setup
const clientId = '7bcb36f5f81ae16c2808';
const clientSecret = '8335a4acc7f2b01a8464d0616f146b7024cd8f93';

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

// to support json
app.use(bodyParser.json());

app.get('/fetch/:item', async (req, res) => {
    const itemName = req.params.item;
    const item = await storage.getItem(itemName);

    if (!item) {
        res.status(404).send('Token not found');
    }

    res.status(200).send(item);
});

// app.get('/oauth/token/fetch', async (req, res) => {
//     const authToken = await storage.getItem('token');

//     if (!authToken) {
//         res.status(404).send('Token not found');
//     }

//     res.status(200).send(authToken);
// });

app.get('/oauth/token/delete', async (req, res) => {
    await storage.removeItem('token');
    res.sendStatus(200);
});

// app.get('/raptor/name/fetch', async (req, res) => {
//     const raptorName = await storage.getItem('raptor-name');

//     if (!raptorName) {
//         res.status(404).send('Raptor name not found');
//     }

//     res.status(200).send(raptorName);
// });

app.post('/raptor/name/set', async (req, res) => {
    await storage.setItem('raptor-name', req.body.name);
    //console.log('raptor name is ' + req.body.name);
    //setRaptorName(req.body.name);
    res.sendStatus(200);
});

app.get('/oauth/register', (req, res) => {
    const { query } = req;
    const { code } = query;

    if (!code) {
        res.send({
            success: false,
            message: 'Error: no code',
        });
    }
    superagent
        .post(
            `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`
        )
        .set('Accept', 'application/json')
        .end(async (err, response) => {
            const { access_token } = response.body;
            const data = response.body;
            await storage.setItem('token', access_token);
            fetchUsername(access_token);
            res.render('signedInSuccess', { data: access_token });
        });
});

// to retrieve the Github username by the token
function fetchUsername(authToken) {
    superagent
        .get('https://api.github.com/user')
        .set({
            Authorization: 'token ' + authToken,
            'User-Agent': 'node.js',
        })
        .end(async (err, res) => {
            //console.log(err);
            //console.log(res.body.login);
            //await storage.setItem('github_username', res.body.login);
            username = res.body.login;
            //createUser(res.body.login);
        });
}

// to create a user using the username as the id(key)
// function createUser(user_id) {
//     let sql_select = `SELECT * FROM users WHERE id='${user_id}'`;
//     database.query(sql_select, (err, rows) => {
//         if (err) throw err;
//         else if (rows && rows.length) {
//             //console.log('same username was found!');
//             return;
//         } else {
//             //console.log('your username is ' + user_id);
//             let sql = `INSERT INTO users (id, raptor_name) VALUES ('${user_id}', 'rap')`;
//             database.query(sql, (err, rows, fields) => {
//                 if (err) throw err;
//             });
//             //console.log('new user is added!');
//         }
//     });
// }

// function setRaptorName(raptor_name) {
//     database.query(
//         `UPDATE users SET raptor_name = '${raptor_name}' WHERE id ='${username}'`,
//         (err, rows, fields) => {
//             if (err) throw err;
//             //console.log('table updated...');
//         }
//     );
// }

// REMOVE IN PRODUCTION. JUST USED TO QUICKLY RESET APP
app.get('/clear', async (req, res) => {
    await storage.clear();
});

// Start the server on port 3000
app.listen(3000, () => console.log('App started on port 3000'));
