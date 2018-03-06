"use strict";

import http from 'http';

http.createServer(function(req, res){
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('It works~~~!');
}).listen(8080);