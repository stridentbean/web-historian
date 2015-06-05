var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var request = require('request');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

exports.readListOfUrls = function(callback){
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    var newData = data.slice(0, data.length-1);
    var urlArray = newData.split('\n');
    callback(urlArray);
  });
};

exports.isUrlInList = function(url, callback){
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    data = data.replace(/\//g, "%10");
    var curContentsArray = data.split('\n');
    result = _.indexOf(curContentsArray, url) > -1 ? true : false;
    callback(result);
  });
};

exports.addUrlToList = function(url){
  fs.readFile(exports.paths.list, function(err, data) {
    var curContents = data;
    curContents += url + '\n';

    fs.writeFile(exports.paths.list, curContents, function(err) {
      if(err) {
        console.log(err);
      }
    });
  });
};

exports.isUrlArchived = function(url, callback){
  url = url.replace(/\//g, "%10");
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    if(err) {
      console.log(err);
    }else{
      var inArchive = _.indexOf(files, url) > -1 ? true : false;
      callback(inArchive);
    }
  });
};

exports.downloadUrls = function(){
  console.log("inside!");
  // fs.writeFile('/Users/student/2015-05-web-historian/workers/logfile.txt', 'abcd', function(err){
  //   console.log(err);
  // });

  exports.readListOfUrls(function(urlArray){
      console.log('urlArray: ' + urlArray);
    _.each(urlArray, function(element, index, collection){
      console.log('element: ' + element);
      var normalElement = element.replace(/%2F/g,"/");
      normalElement = normalElement.replace(/%3A/g,":");

      request(normalElement, function (error, response, body) {
        console.log('normalElement:' + normalElement);
        console.log('inside request' + body);
        if (!error && response.statusCode == 200) {

          fs.writeFile('/Users/student/2015-05-web-historian/archives/sites/' + element, body, function(err){
            if(err){
              return;
            }

          });
        }
      });
    });
  });

};

exports.getArchivedUrl = function(url, callback){
  url = url.replace(/\//g, "%10");
  fs.readFile(exports.paths.archivedSites + '/' + url, function (err, data) {
    if(err) {
      console.log(err);
    } else {
      callback(data);
    }
  })
};
