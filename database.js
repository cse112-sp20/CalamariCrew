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
    let sql = 'CREATE TABLE table2(id int AUTO_INCREMENT, text VARCHAR(255), primary key (id))';
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Table created...');
    });
});

// Read/Print table
app.get('/readtable', (req, res) =>{
    let sql = 'SELECT * from table2';
    db.query(sql, (err, rows, fields) => {
        if(err) throw err;
        console.log('Table printed');
        res.send(rows);
    });
});

// Insert values into table
app.get('/insertintotable', (req, res) =>{
    let sql = "INSERT INTO table2 (text) VALUES ('this is first')";
    db.query(sql, (err, rows, fields) => {
        if(err) throw err;
        console.log('info inserted...');
        res.send('info inserted...');
    });
});

// Update table's value
app.get('/updatetable', (req, res) =>{
    let sql = "UPDATE table2 SET text = 'this is 3rd' WHERE id = 3";
    db.query(sql, (err, rows, fields) => {
        if(err) throw err;
        console.log('table updated...');
        res.send('table updated...');
    });
});


app.listen('3000', () =>{
    console.log('Server started on port 3000');
});