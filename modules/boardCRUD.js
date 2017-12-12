// NODE - MODULES - boardCRUD.js

// dependencies
var fs = require ("fs");
var _ = require("underscore");
var path = require("path");
var filePath = path.resolve(path.dirname(__dirname), "data/boardData.json");

// module functions on a singleton object
module.exports = {
  __read: function() {
    return JSON.parse(fs.readFileSync(filePath, "utf8"));
  },
  
  get: function() {
    return this.__read();
  },
  
  write: function(data) {
    // write with file system object method
    fs.writeFileSync(filePath, JSON.stringify(data), "utf8");
  },
};
