// Filename - server.js

const express = require('express');
const api = require('./api');

const port = 3000;
const app = express();

const cors = require('cors');
app.use(cors());

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log("Server is listening at port: " + port);
});

// Parses incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// Parses incoming requests with JSON payloads
app.use(express.json());

// Use the API routes from api.js for all routes starting with '/api'
app.use('/api', api);


