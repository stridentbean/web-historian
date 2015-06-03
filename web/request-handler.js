var path = require('path');
var dispatcher = require('httpdispatcher');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

var sendMessage = function(req, res){
  res.writeHead(200, httpHelpers.headers);
  res.end();
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
  // res.end(archive.paths.list);
};

dispatcher.onGet("/", function(req, res) {
  res.writeHead(200, httpHelpers.headers);

  fs.readFile(path.join(__dirname, './public/index.html'), function(err, data){
    if(err){
      console.log(err);
    }else{
      res.end(data);
    }
  });

});
