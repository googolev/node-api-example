const express = require('express');
var bodyParser = require('body-parser');
const db = require('./db');
var cors = require('cors')

const app = express();

app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

const mongoURL = 'mongodb://localhost:27017/myapi'

db.connect(mongoURL, function (err) {
    if (err) {
        console.log(err)
    }
    app.listen(3030, function () {
        console.log('\x1b[33m%s\x1b[0m\x1b[4m', "API STARTED")
        require('./routes/artist.js')(app)
        require('./routes/equip.js')(app)
    })
})