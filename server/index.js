const http = require('http');

const express = require('express');
const cors = require('cors');
const PORT = 3000; // may need to transfer to .env and import with .process


const app = express();
const server = http.createServer(app);

app.use('/',(req, res, next) => {
    console.log('Running on 3000!');
    res.send('Working server...');
});

server.listen(PORT);