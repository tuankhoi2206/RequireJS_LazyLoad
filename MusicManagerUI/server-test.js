var http= require("http");

http.createServer(function (request, response)
{
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello NodeJS');
}).listen(9090);
console.log('atServer running at http://127.0.0.1:9090/');