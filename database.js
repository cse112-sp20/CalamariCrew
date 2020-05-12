const express = require('express');
const mysql = require('mysql');
const app = express();

// Create connection
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '12345678',
    database : 'my_db'
});

// Connect
db.connect(function(err) {
    if(err) {
        console.log('Connection failed...');
        throw err;
        
    } else {
        console.log('mySQL connected...');
    }
    
});

// Create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE my_db';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});

// Create table
app.get('/createtable', (req, res) =>{
    let sql = 'CREATE TABLE table1(id int AUTO_INCREMENT, text VARCHAR(255), primary key (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table created...');
    });
});

app.listen('3000', () =>{
    console.log('Server started on port 3000');
});