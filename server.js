const express = require('express')
var bodyParser = require('body-parser')

const app = express()
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

var dataController = require('./src/mockServer/dataController');

app.get('/api/events', dataController.getEvents);
app.get('/api/events/:uid', dataController.getEventById);
app.post('/api/events', dataController.postEvent);

const port = 3002;

app.listen(process.env.PORT || port);
