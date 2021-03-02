const express = require('express');
var bodyParser = require('body-parser');

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

var dataController = require('./src/mockServer/dataController');

app.get('/events', dataController.getEvents);
app.get('/event/:uid', dataController.getEventById);
app.post('/events', dataController.postEvent);

const port = 3002;

app.listen(process.env.PORT || port);
