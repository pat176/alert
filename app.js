var http = require('http');
var dt = require('./main.js');
dt.getD("SOL")
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write("Hello");
  res.end();
}).listen(8080);