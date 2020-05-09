var createError = require( 'http-errors' );
var express = require( 'express' );


const app = express();

app.listen(3000, () => console.log('App started on port 3000'));

module.exports = app;
