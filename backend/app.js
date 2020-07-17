const express = require('express');
const restful = require('node-restful');
const server = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

//DB
mongoose.connect('mongodb://db/mydb', {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
});

// Middlewares
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(cors());

// ODM
const Client = restful.model('Client', {
    name: { type: String, required: true }
})

// Rest API
Client.methods(['get', 'post', 'put', 'delete']);
Client.updateOptions({ new: true, runValidators: true });

// Routes
Client.register(server, '/clients');

// Start
server.listen(3000);