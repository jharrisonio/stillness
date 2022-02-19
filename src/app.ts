import http from 'http';
import { Parser } from './ts-parser';

const hostname = '127.0.0.1';
const port = 8080;

const getAST = function(req: http.IncomingMessage, res: http.ServerResponse) {
  const parser = new Parser('./sample-project/index.ts');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(JSON.stringify(parser.getTree(), null, 4));
}

const postAST = function(req: http.IncomingMessage, res: http.ServerResponse) {
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('hello world');
}

const server = http.createServer((req, res) => {
  switch(req.method) {
    case 'GET':
      return getAST(req, res);
    case 'POST':
      return postAST(req, res);
  }
  
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});