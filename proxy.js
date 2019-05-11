const http = require('http');
const url = require('url');

http.createServer((req, res) => {
  const path = url.parse(req.url).path;
  console.log(path);

  if (path.startsWith('/utf8-php')) {
    let request = http.request({
      port: 8080,
      path,
      headers: req.headers
    }, (response) => {
      res.writeHead(response.statusCode, response.headers);
      response.pipe(res);
    });
    req.pipe(request);
  } else {
    let request = http.request({
      port: 3000,
      path,
      headers: req.headers
    }, (response) => {
      res.writeHead(response.statusCode, response.headers);
      response.pipe(res);
    });
    req.pipe(request);
  }
}).listen(8000);
