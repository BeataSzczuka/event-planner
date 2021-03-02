const path = require('path');
const fs = require('fs');

const basePathToData = path.join(__dirname, '');

const getJsonData = function (filename) {
  var file = path.join(basePathToData, filename);
  return JSON.parse(fs.readFileSync(file, 'utf-8'));
};

const getJsonDataById = function (filename, id) {
    var file = path.join(basePathToData, filename);
    return JSON.parse(fs.readFileSync(file, 'utf-8')).find((obj) => obj.id == id);
};

const saveJsonData = function (filename, newData) {
    var file = path.join(basePathToData, filename);

    fs.readFile(file, (error, content) => {
        if (error) return {error: "Something went wrong"};
        var parsedData = JSON.parse(content);
        parsedData.push(newData);
        fs.writeFile(file, JSON.stringify(parsedData), () => ({error: "Something went wrong"}) )

    })

    return newData;
  };

exports.getEvents = function (request, response) {
  var data = getJsonData('data.json');
  setTimeout(function() {
    return response.send(data);
  }, 100);
};

exports.getEventById = function (request, response) {
    var data = getJsonDataById('data.json', request.params.uid);
    setTimeout(function() {
      return response.send(data);
    }, 100);
  };

exports.postEvent = function (request, response) {
    var data = saveJsonData('data.json', request.body);
    setTimeout(function() {
        return response.send(data);
    }, 100);
};
