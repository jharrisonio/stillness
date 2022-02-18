import http from 'http';
import { Parser } from './ts-parser';

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  const parser = new Parser('./sample-project/function.ts');
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(JSON.stringify(parser.getTree(), null, 4));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});