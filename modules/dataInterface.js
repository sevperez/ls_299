// NODE - MODULES - boardCRUD.js

// dependencies
var fs = require ("fs");
var _ = require("underscore");
var path = require("path");
var filePath = path.resolve(path.dirname(__dirname), "data/data.json");

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
  
  getNextId: function(coll) {
    if (coll.length === 0) {
      return 1;
    } else {
      return _.max(coll, function(item) {
        return item.id;
      }).id + 1;
    }
  },
};
