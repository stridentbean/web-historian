var path = require('path');
var dispatcher = require('httpdispatcher');
var archive = require('..//helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');
var _ = require('underscore');
// require more modules/folders here!

var sendMessage = function(req, res){
  res.writeHead(200, httpHelpers.headers);
  res.end();
};

var sendFile = function(path, res){
  fs.readFile(path, function(err, data){
    if(err){
      console.log(err);
    }else{
      res.end(data);
    }
  });
};

exports.handleRequest = function (req, res) {
  try {
    console.log('Serving request type ' + req.method + ' for url ' + req.url);
    if(req.method === 'OPTIONS'){
      //TODO: define this
      sendMessage(req, res);
    }else{
      dispatcher.dispatch(req, res);
    }
  }catch(err){
    console.log(err);
  }

};

dispatcher.onGet('/', function(req, res) {
  res.writeHead(200, httpHelpers.headers);
  sendFile(path.join(__dirname, './public/index.html'), res);
});

dispatcher.onPost("/", function(req, res){
  console.log('inside the post!');
  var thisURL = req.body.slice(_.indexOf(req.body, '=') + 1);
  thisURL = thisURL.replace(/\//g, "%2F");
  thisURL = thisURL.replace(/:/g, "%3A");
  archive.isUrlInList(thisURL, function(inList){
    if(inList) {
      console.log('it is registering as in the list');
      archive.isUrlArchived(thisURL, function(inArchive){
        if (inArchive){
          res.writeHead(200, httpHelpers.headers);
          archive.getArchivedUrl(thisURL, function(data){
          res.end(data);
          });
        } else {
          res.writeHead(302, httpHelpers.headers);
          sendFile(path.join(__dirname, './public/loading.html'),res);
        }
      });
    }else{
      console.log('it is registering as NOT in the list');
      archive.addUrlToList(thisURL);
      res.writeHead(302, httpHelpers.headers);
      sendFile(path.join(__dirname, './public/loading.html'),res);
    }
  });
});


