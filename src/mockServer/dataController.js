const path = require('path');
const fs = require('fs');

const basePathToData = path.join(__dirname, '');

const getJsonData = function (filename) {
  var file = path.join(basePathToData, filename);
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

const getJsonDataById = function (filename, id) {
  var file = path.join(basePathToData, filename);
  return JSON.parse(fs.readFileSync(file, 'utf-8')).find((obj) => Number(obj.id) === Number(id));
};

const saveJsonData = function (filename, newData) {
  var file = path.join(basePathToData, filename);

  fs.readFile(file, (error, content) => {
    if (error) return { error: 'Something went wrong' };
    var parsedData = JSON.parse(content);
    let id = 0;
    parsedData.forEach((elem) => {
      if (elem.id > id) id = elem.id + 1;
    });
    parsedData.push({ id, ...newData });
    fs.writeFile(file, JSON.stringify(parsedData), () => ({ error: 'Something went wrong' }));
  });

  return newData;
};

exports.getEvents = function (request, response) {
  var data = getJsonData('data.json');
  setTimeout(function () {
    return response.send(data);
  }, 100);
};

exports.getEventById = function (request, response) {
  var data = getJsonDataById('data.json', request.params.uid);
  setTimeout(function () {
    return response.send(data);
  }, 100);
};

exports.postEvent = function (request, response) {
  const tempPath = request.file.path;
  const targetPath = path.join(__dirname, './uploads/'.concat(request.file.originalname));
  fs.rename(tempPath, targetPath, (err) => console.log(err));

  var data = saveJsonData('data.json', { ...request.body, image: request.file.originalname });
  setTimeout(function () {
    return response.send(data);
  }, 100);
};

exports.getImage = function (req, res) {
  var imagePath = './uploads/'.concat(req.params.uimg);
  res.sendFile(path.join(__dirname, imagePath));
};
