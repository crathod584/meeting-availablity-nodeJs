'use strict';

const express = require("express");
var cors = require('cors')

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors()); // cors enable

/*set routs for app*/
require('./config/routes')(app);

/*Start server*/
var listener = app.listen(3000, function() {
    console.log("server started at port ", listener.address().port);
});

module.exports = app;