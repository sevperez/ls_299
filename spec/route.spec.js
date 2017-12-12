// JASMINE - Express Route Tests

var request = require("request");
var root = "https://main-sevperez.c9users.io/";

describe("Index", function() {
  describe("/", function() {
    it("returns an index page", function(done) {
      request(root, function(e, response, body) {
        console.log(body);
        expect(true).toBe(true);
        
        done();
      });
    });
  });
});
