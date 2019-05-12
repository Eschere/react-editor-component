const http = require('http');
const url = require('url');

/**
 * 如果你要准备ueditor和ReactUEditorComponent同时开发联调
 * 一下的配置可以解决两个项目在不同端口下运行时，iframe产生的跨域问题
 * 将ueditor运行在8080端口，/utf8-phplu路径
 * 将ReactUEditorComponent运行在3000端口
 * 浏览器访问8000端口
 */
let server = http.createServer((req, res) => {
  const path = url.parse(req.url).path;
  console.log(path);

  if (path.startsWith('/utf8-php')) {
    let request = http.request({
      port: 8080,
      path,
      method: req.method,
      headers: req.headers
    }, (response) => {
      res.writeHead(response.statusCode, response.headers);
      response.pipe(res);
    });
    req.pipe(request);
  } else if (!path.includes('websocket')) {
    let request = http.request({
      port: 3000,
      path,
      method: req.method,
      headers: req.headers
    }, (response) => {
      res.writeHead(response.statusCode, response.headers);
      response.pipe(res);
    });
    req.pipe(request);
  } else {
    res.end();
  }
}).listen(8000);

// websocket转发
server.on('upgrade', (req, client) => {
  const path = url.parse(req.url).path;
  let request = http.request({
    port: 3000,
    path,
    headers: req.headers
  });

  request.on('upgrade', (res, socket) => {
    client.write(formatProxyResponse(res));
    client.pipe(socket);
    socket.pipe(client);
  });

  request.end();
});

function formatProxyResponse (res) {
  const headers = res.headers;
  const keys = Object.getOwnPropertyNames(headers);
  let switchLine = '\r\n';
  let response = [`HTTP/${res.httpVersion} ${res.statusCode} ${res.statusMessage}${switchLine}`];
  keys.forEach((key) => {
    response.push(`${key}: ${headers[key]}${switchLine}`);
  });
  response.push(switchLine);
  return response.join('');
}
