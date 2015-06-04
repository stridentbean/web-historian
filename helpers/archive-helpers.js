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

exports.accessList = function(callback) {
  fs.readFile(exports.paths.list, function(err, data) {
    var parseList = JSON.parse(data);
    return callback(parseList);
  });
};

exports.readListOfUrls = function(){
};

exports.isUrlInList = function(url){
  return this.accessList(function(parseList){
    return _.indexOf(parseList.all, url) >= 0 ? true : false;
  });
  // fs.readFile(paths.list, function(err, data) {
  //   var parseList = JSON.parse(data);
  //   return _.indexOf(parseList.all, url) >= 0 ? true : false;
  // });
};

exports.addUrlToList = function(url){
  this.accessList(function(parseList){
    parseList.all.push(url);

    fs.writeFile(exports.paths.list, JSON.stringify(parseList), function(err) {
      if(err) {
        console.log(err);
      }
    });
  });
};

exports.isURLArchived = function(url){
  return this.accessList(function(parseList){
    return _.indexOf(parseList.archived, url) >= 0 ? true : false;
  });
};

exports.downloadUrls = function(){
};

exports.getArchivedUrl = function(url){
 //return string
};
