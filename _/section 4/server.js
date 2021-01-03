var http = require("http");
var fs = require("fs");
var through = require("through2");

var server = http.createServer((request, response) => {
    if (request.method === 'POST') {
        request.pipe(through(function(buf, _, next) {
            this.push(buf.toString().toUpperCase());
            next();
        })).pipe(response);
    } else {
        fs.createReadStream('nodejs-logo.png').pipe(response);
    }
});

const PORT = 8080;

server.listen(PORT, function() {
    console.log("server listing on : http://localhost:%s", PORT);
});