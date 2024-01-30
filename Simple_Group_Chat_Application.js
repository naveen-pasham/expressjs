// Group Chat Application

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    res.send(`
        <form action="/login" method="POST">
            <label for="username">Username:</label>
            <input type="text" name="username">
            <button type="submit">Login</button>
        </form>
    `);
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    res.cookie('username', username);
    res.redirect('/');
});

app.get('/', (req, res) => {
  
    fs.readFile('messages.txt', (err, data) => {

        res.send(`
            <h1>Welcome to the  Simple Group Chat Application</h1>
            <h4>${data}</h4>
            <form action="/" method="POST">
                <label for="message">Message:</label>
                <input type="text" name="message">
                <button type="submit">Send</button>
            </form>
        `);
    });
});

app.post('/', (req, res) => {
    const username = req.cookies.username;
    const message = req.body.message;
    const chatMessage = `${username}: ${message}\n`;
    fs.appendFile('messages.txt', chatMessage, (err) => {
        if (err) {
            console.log(err);
            res.status(404).send("An error occurred");
            return;
        }
        res.redirect('/');
    });
});

app.listen(3000);
