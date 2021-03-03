const express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: './src/mockServer/uploads/' });

const app = express();
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

var dataController = require('./src/mockServer/dataController');

app.get('/events', dataController.getEvents);
app.get('/event/:uid', dataController.getEventById);
app.post('/events', upload.single('image'), dataController.postEvent);

app.get('/image/:uimg', dataController.getImage);

const port = 3002;

app.listen(process.env.PORT || port);
