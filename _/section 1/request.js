var request = require("request");

request('http://www.google.com', function(error, response, body) {
  console.log(response.statusCode); // 200
  console.log(response.headers['content-type']);
});

console.log('Done!');