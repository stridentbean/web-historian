var fs = require('fs');
var path = require('path');
var _ = require('underscore');

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
    console.log('we are inside');
    var curContentsArray = data.split('\n');
    callback(curContentsArray);
  });
};

exports.isUrlInList = function(url){
  fs.readFile(exports.paths.list, 'utf8', function(err, data) {
    var curContentsArray = data.split('\n');
    return _.indexOf(curContentsArray, url) > -1 ? true : false;
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

exports.isURLArchived = function(url){
  fs.readdir(exports.paths.archivedSites, function(err, files) {
    return _.indexOf(files, url) > -1 ? true : false;
  });
};

exports.downloadUrls = function(){
};

exports.getArchivedUrl = function(url){
 //return string
};
