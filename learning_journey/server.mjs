import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.dirname(fileURLToPath(import.meta.url));
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
};

http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost');
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/01_first_threejs_scene/src/index.html';
    if (pathname.endsWith('/')) pathname += 'index.html';

    // 只允许读取 learning_journey 内部文件，避免通过 ../ 访问仓库其它位置。
    const target = path.resolve(root, `.${pathname}`);
    if (!target.startsWith(`${root}${path.sep}`)) {
      response.writeHead(403).end('Forbidden');
      return;
    }

    const body = await readFile(target);
    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(target)] ?? 'application/octet-stream',
      'Cache-Control': 'no-cache',
    });
    response.end(body);
  } catch {
    response.writeHead(404).end('Not found');
  }
}).listen(5631, '127.0.0.1', () => {
  console.log('Learning Journey: http://127.0.0.1:5631/');
});
